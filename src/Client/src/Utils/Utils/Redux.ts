import { Store } from '../../System'

/**
 * Utils for Redux.
 *
 * Automatic changes on action types:
 * For toggle actions: ACTION_TYPE -> ACTION_TYPE_ON, ACTION_TYPE_OFF.
 * For async actions: ACTION_TYPE -> ACTION_TYPE_SENT, ACTION_TYPE_SUCCESS, ACTION_TYPE_FAIL.
 */
class Redux {

    private constructor() {

    }

    /**
     * Default entities.
     */
    public static EMPTY_ENTITY = null
    public static EMPTY_ASYNC_ENTITY = { error: null, payload: null, isSent: false }
    private static EMPTY_ASYNC_ENTITY_KEYS = Object.keys(Redux.EMPTY_ASYNC_ENTITY)

    private static SUFFIXES = {
        SENT: '_SENT',
        SUCCESS: '_SUCCESS',
        FAIL: '_FAIL',
        ON: '_ON',
        OFF: '_OFF'
    }

    /**
     * Process redux action.
     * @param changes Property with async request.
     * @param type Type of action. There is no suffix like _SENT, _SUCCESS or _FAIL.
     * @param onSuccess Callback after success.
     * @param onFail Callback after fail.
     * @return Runnable dispatch.
     */
    public static asyncAction<T>(type: string, changes: Universis.Map<Promise<T>>, onSuccess?: Universis.Consumer2<T, any>, onFail?: Universis.Consumer2<Error, any>): Universis.Redux.ActionResult<T> {
        return dispatch => {

            const property = Object.keys(changes)[0]
            dispatch({ type: type + this.SUFFIXES.SENT, property, $async: {} })

            return changes[property]
                .then(payload => {
                    dispatch({ type: type + this.SUFFIXES.SUCCESS, property, $async: { payload } })

                    if (onSuccess) {
                        onSuccess(payload, dispatch)
                    }

                    return Promise.resolve(payload)
                })
                .catch(error => {
                    dispatch({ type: type + this.SUFFIXES.FAIL, property, $async: { error } })

                    if (onFail) {
                        onFail(error, dispatch)
                    }

                    return Promise.reject(error)
                })
        }
    }

    /**
     * Process action, that toggle boolean value of some property.
     * There can be also another values, but toggled value must be first (can be nested value).
     * @param type Type of action.
     * @param changes Toggled property with value.
     * @param callback Callback after toggle  (only first toggled value).
     * @returns Toggle action.
     */
    public static toggleAction(type: string, changes: Universis.Redux.Changes, callback?: Universis.Runnable): Universis.Redux.SetAction {
        const isTrue = this.getFirstValue<boolean>(this.getChanges(changes))
        const { ON, OFF } = this.SUFFIXES
        return this.setAction(type + (isTrue ? ON : OFF), changes, callback)
    }

    /**
     * Process set action, that set some property to value.
     * @param type Type of action.
     * @param changes Changes in old state.
     * @param callback Callback after change state.
     * @returns Action.
     */
    public static setAction(type: string, changes: Universis.Redux.Changes, callback?: Universis.Runnable): Universis.Redux.SetAction {
        return { type, $set: this.getChanges(changes), $callback: callback }
    }

    /**
     * Create redux reducer.
     * @param actionTypes List of actions of reducer.
     * @param initialState Initial state of reducer.
     * @returns Reducer.
     */
    public static createReducer(actionTypes: string[], initialState: Universis.Redux.StoreState = {}) {
        return <T>(state: Universis.Redux.StoreState = initialState, action: Universis.Redux.SetAction | Universis.Redux.AsyncAction<T>) => {
            if (actionTypes.includes(this.removeSuffixFromActionType(action.type))) {
                if ('$set' in action) {
                    state = this.applySetAction(state, action)
                }

                if ('$async' in action) {
                    state = this.applyAsyncAction<T>(state, action)
                }

                if (action.$callback) {
                    action.$callback()
                }

                return state
            } else {
                return state
            }
        }
    }

    /**
     * Apply set action to store state.
     * @param state Old store state.
     * @param action Action.
     * @returns New store state.
     */
    private static applySetAction(state: Universis.Redux.StoreState, action: Universis.Redux.SetAction): Universis.Redux.StoreState {
        const applyNestedChange = (source: any, change: any) => {
            if (change && change.$find) {
                const index = source.findIndex(change.$find)
                delete change.$find
                source[index] = applyNestedChange(source[index], change)
            }

            if (change && change.$add !== undefined) {
                if (!source) {
                    return source
                }

                source = [...(source || []), change.$add]
            }

            if (change && change.$addFirst !== undefined) {
                if (!source) {
                    return source
                }

                source = [change.$addFirst, ...(source || [])]
            }

            if (change && change.$remove) {
                if (!source) {
                    return source
                }

                const index = source.findIndex(change.$remove)

                if (index > -1) {
                    source.splice(index, 1)
                }
            }

            if (change && change.$set) {
                source = change.$set
            }

            if (change && change.$inc) {
                source += change.$inc
            }

            const key = Object.keys(change)[0]

            if (key && !key.startsWith('$') && change && typeof change[key] === 'object' && Object.keys(change).filter(key => (Redux.EMPTY_ASYNC_ENTITY_KEYS.includes(key))).length < 3) {
                for (const i in change) {
                    if (!(i.startsWith('$'))) {
                        source[i] = change[i] !== null ? applyNestedChange(source[i], change[i]) : null
                    }
                }
            } else if (key && !key.startsWith('$')) {
                source = { ...source, ...change }
            }

            return source
        }

        return applyNestedChange(JSON.parse(JSON.stringify(state)), action.$set)
    }

    /**
     * Apply async action. There is object { error, isSent, payload }.
     * @param state Old store state.
     * @param action Action.
     * @returns New store state.
     */
    private static applyAsyncAction<T>(state: Universis.Redux.StoreState, action: Universis.Redux.AsyncAction<T>): Universis.Redux.StoreState {
        const { SENT, SUCCESS, FAIL } = this.SUFFIXES

        if (this.hasSuffix(action.type, SENT)) {
            return {
                ...state,
                [action.property]: {
                    isSent: true
                }
            }
        } else if (this.hasSuffix(action.type, SUCCESS)) {
            return {
                ...state,
                [action.property]: {
                    ...state[action.property],
                    error: null,
                    isSent: false,
                    payload: action.$async.payload
                }
            }
        } else if (this.hasSuffix(action.type, FAIL)) {
            return {
                ...state,
                [action.property]: {
                    ...state[action.property],
                    error: action.$async.error,
                    isSent: false,
                    payload: null
                }
            }
        } else {
            return state
        }
    }

    /**
     * Remove suffix _SENT, _ON, _OFF, _FAIL, etc. from action type.
     * @param actionType Action type.
     * @returns Action type without suffix.
     */
    private static removeSuffixFromActionType(actionType: string): string {
        const suffixes = Object.values(this.SUFFIXES).join('|')
        const regExp = new RegExp('(' + suffixes + ')$')
        return actionType.replace(regExp, '')
    }

    /**
     * Check if action type has suffix.
     * @param actionType
     * @param suffix
     * @returns Action type has suffix.
     */
    private static hasSuffix(actionType: string, suffix: string): boolean {
        const regExp = new RegExp(suffix + '$')
        return regExp.test(actionType)
    }

    /**
     * Get first non-object value of state.
     * { a: { b: { c: 7, d: 6, e: 8 }, f: 4 }} returns 7.
     * @param value State object.
     * @returns Nested boolean value.
     */
    private static getFirstValue<T>(value: Universis.Map<any>): T {
        let result = value

        while (typeof result === 'object') {
            const property = Object.keys(result)[0]
            result = result[property]
        }

        return result
    }

    /**
     * Return plain object changes.
     * @param changes Plain or functional changes.
     */
    private static getChanges(changes: Universis.Redux.Changes): Universis.Redux.Changes.Plain {
        return typeof changes === 'function' ? changes(Store.getState()) : changes
    }

}

export default Redux