/**
 * Utils for redux.
 */
class Redux {

    private constructor() {

    }

    /**
     * Process redux action.
     * @param request Async request to API.
     * @param type Type of action. There is no suffix like _SENT, _SUCCESS or _FAIL.
     * @param map Map result in resolve request.. (optional)
     * @return Runnable dispatch.
     */
    public static asyncAction<T>(request: Promise<T>, type: string): IActionResult<T> {
        return dispatch => {
            dispatch({ type, _async: true })

            return request
                .then(payload => dispatch({ type, payload, _async: true }))
                .catch(error => dispatch({ type, error, _async: true }))
        }
    }

    /**
     * Process redux action, that toggle two values (true, false).
     * @param type Type of action.
     * @returns Action.
     */
    public static toggleAction(type: string): IToggleAction {
        return { type, _toggle: true }
    }

    /**
     * Process set action, that set some property to value.
     * @param type Type of action.
     * @param value Value.
     * @returns Action.
     */
    public static setAction(type: string, value: any): ISetAction {
        return { type, value, _set: true }
    }

    /**
     * Create redux reducer.
     * @param initialState Initial state of reducer.
     * @param specificReducer This is probably function, that contains switch of action types.
     * @returns Reducer.
     */
    public static createReducer(initialState: IStoreState = {}, specificReducer?: IReducer): IReducer {
        return <T>(state: IStoreState = initialState, action: IAsyncAction<T> | IToggleAction | ISetAction) => {
            const specificReducerResult = specificReducer ? specificReducer(state, action) : null
            return specificReducerResult || Redux.reducer(state, action)
        }
    }

    /**
     * Apply redux action and modify store.
     * @param state Current state of store.
     * @param action action.
     * @returns New state of store.
     */
    private static reducer<T>(state: IStoreState, action: IAsyncAction<T> | IToggleAction | ISetAction): IStoreState {
        if ('_toggle' in action) {
            return {
                ...state,
                [action.type]: !state[action.type]
            }
        } else if ('_set' in action) {
            return {
                ...state,
                [action.type]: action.value
            }
        } else if ('_async' in action) {
            if (!state[action.type] || !state[action.type].isSent) {
                return {
                    ...state,
                    ...Redux.setEntity<T>(action.type, null, true, null)
                }
            } else if (action.error) {
                return {
                    ...state,
                    ...Redux.setEntity<T>(action.type, null, false, action.error)
                }
            } else {
                return {
                    ...state,
                    ...Redux.setEntity<T>(action.type, action.payload, false, null)
                }
            }
        } else {
            return state
        }
    }

    /**
     * Set value of entity (payload, isSent, error).
     * @param actionType Type of action.
     * @param payload Payload.
     * @param isSent Is sent value.
     * @param error Error value.
     * @returns Value of entity.
     */
    private static setEntity<T>(actionType: string, payload: T, isSent: boolean, error: string): IReducerEntity {
        return {
            [actionType]: { payload, isSent, error }
        }
    }

}

export default Redux