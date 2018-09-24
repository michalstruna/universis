/**
 * Utils for Redux.
 *
 * Automatically changes on action types:
 * For toggle actions: ACTION_TYPE -> ACTION_TYPE_ON, ACTION_TYPE_OFF.
 * For async actions: ACTION_TYPE -> ACTION_TYPE_SENT, ACTION_TYPE_SUCCESS, ACTION_TYPE_FAIL.
 */
class Redux {

    private constructor() {

    }

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
     * Process redux action, that toggle two values (true, false).
     * @param type Type of action.
     * @param toggle Toggled property.
     * @param changes ll another properties will be set.
     * @param callback Callback after toggle  (only first toggled value).
     * @returns Toggle action.
     */
    public static toggleAction(type: string, toggle: IObject<boolean>, changes: IObject<any> = {}, callback?: IRunnable): IToggleAction {
        const property = Object.keys(toggle)[0]
        const { ON, OFF } = Redux.SUFFIXES

        return {
            type: type + (toggle[property] ? ON : OFF),
            $toggle: toggle,
            $set: changes,
            $callback: callback
        }
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
        return <T>(state: IStoreState = initialState, action: ISetAction | IIncrementAction | IToggleAction | IAsyncAction<T>) => {
            if (actionTypes.includes(Redux.removeSuffixFromActionType(action.type))) {
                if ('$set' in action) {
                    state = Redux.applySetAction(state, action)
                }

                if ('$toggle' in action) {
                    state = Redux.applyToggleAction(state, action)
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
        let newState = state

        for (const property in action.$set) {
            if (action.$set.hasOwnProperty(property)) {
                newState = {
                    ...newState,
                    [property]: action.$set[property]
                }
            }
        }

        return newState
    }

    /**
     * Apply toggle action to store state.
     * @param state Old store state.
     * @param action Action.
     * @returns New store state.
     */
    private static applyToggleAction(state: IStoreState, action: IToggleAction): IStoreState {
        const property = Object.keys(action.$toggle)[0]

        return {
            ...state,
            [property]: action.$toggle[property]
        }
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
                    error: action.$async.error,
                    isSent: false,
                    payload: null
                }
            }
        } else if (Redux.hasSuffix(action.type, FAIL)) {
            return {
                ...state,
                [action.property]: {
                    ...state[action.property],
                    error: null,
                    isSent: false,
                    payload: action.$async.payload
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
     * Apply deep merge to two states.
     * @param state1
     * @param state2
     * @returns Merged immutable state.
     */
    private static mergeStates(state1: any, state2: any): any {
        // TODO
    }

}

export default Redux