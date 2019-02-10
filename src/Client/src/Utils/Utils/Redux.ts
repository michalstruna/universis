/**
 * Utils for Redux.
 *
 * Automatic changes on action types:
 * For toggle actions: ACTION_TYPE -> ACTION_TYPE_ON, ACTION_TYPE_OFF.
 * For async actions: ACTION_TYPE -> ACTION_TYPE_SENT, ACTION_TYPE_SUCCESS, ACTION_TYPE_FAIL.
 */
import apply = Reflect.apply

class Redux {

    private constructor() {

    }

    /**
     * Default entities.
     */
    public static EMPTY_ENTITY = null
    public static EMPTY_ASYNC_ENTITY = { error: null, payload: null, isSent: false }

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
    public static asyncAction<T>(type: string, changes: IObject<Promise<T>>, onSuccess?: IConsumer<T>, onFail?: IConsumer<Error>): IActionResult<T> {
        return dispatch => {
            const property = Object.keys(changes)[0]

            dispatch({ type: type + Redux.SUFFIXES.SENT, property, $async: {} })

            return changes[property]
                .then(payload => {
                    dispatch({ type: type + Redux.SUFFIXES.SUCCESS, property, $async: { payload } })

                    if (onSuccess) {
                        onSuccess(payload)
                    }

                    return Promise.resolve(payload)
                })
                .catch(error => {
                    dispatch({ type: type + Redux.SUFFIXES.FAIL, property, $async: { error } })

                    if (onFail) {
                        onFail(error)
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
    public static toggleAction(type: string, changes: IObject<any>, callback?: IRunnable): ISetAction {
        const isTrue = Redux.getFirstValue<boolean>(changes)
        const { ON, OFF } = Redux.SUFFIXES
        return Redux.setAction(type + (isTrue ? ON : OFF), changes, callback)
    }

    /**
     * Process set action, that set some property to value.
     * @param type Type of action.
     * @param changes Changes in old state.
     * @param callback Callback after change state.
     * @returns Action.
     */
    public static setAction(type: string, changes: IObject<any>, callback?: IRunnable): ISetAction {
        return { type, $set: changes, $callback: callback }
    }

    /**
     * Create redux reducer.
     * @param actionTypes List of actions of reducer.
     * @param initialState Initial state of reducer.
     * @returns Reducer.
     */
    public static createReducer(actionTypes: string[], initialState: IStoreState = {}) {
        return <T>(state: IStoreState = initialState, action: ISetAction | IAsyncAction<T>) => {
            if (actionTypes.includes(Redux.removeSuffixFromActionType(action.type))) {
                if ('$set' in action) {
                    state = Redux.applySetAction(state, action)
                }

                if ('$async' in action) {
                    state = Redux.applyAsyncAction<T>(state, action)
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
    private static applySetAction(state: IStoreState, action: ISetAction): IStoreState {
        const applyNestedChange = (source: any, change: any) => {
            if (change.$find) {
                const index = source.findIndex(change.$find)
                delete change.$find
                source[index] = applyNestedChange(source[index], change)
            } else if (change.$add) {
                source = [...source, change.$add]
            } else if (change.$remove) {
                const index = source.findIndex(change.$remove)

                if (index > -1) {
                    source.splice(index, 1)
                }
            } else if (typeof change[Object.keys(change)[0]] === 'object') {
                for (const i in change) {
                    if (!(i.startsWith('$'))) {
                        source[i] = applyNestedChange(source[i], change[i])
                    }
                }
            } else {
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
    private static applyAsyncAction<T>(state: IStoreState, action: IAsyncAction<T>): IStoreState {
        const { SENT, SUCCESS, FAIL } = Redux.SUFFIXES

        if (Redux.hasSuffix(action.type, SENT)) {
            return {
                ...state,
                [action.property]: {
                    isSent: true
                }
            }
        } else if (Redux.hasSuffix(action.type, SUCCESS)) {
            return {
                ...state,
                [action.property]: {
                    ...state[action.property],
                    error: null,
                    isSent: false,
                    payload: action.$async.payload
                }
            }
        } else if (Redux.hasSuffix(action.type, FAIL)) {
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
        const suffixes = Object.values(Redux.SUFFIXES).join('|')
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
    private static getFirstValue<T>(value: IObject<any>): T {
        let result = value

        while (typeof result === 'object') {
            const property = Object.keys(result)[0]
            result = result[property]
        }

        return result
    }

}

export default Redux