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
     * @param onResolve Callback after resolve request. (optional)
     * @param onReject Callback after reject request. (optional)
     * @return Runnable dispatch.
     */
    public static asyncAction<T>(request: Promise<T>, type: string, onResolve?: IResolveAsyncAction<T>, onReject?: IRejectAsyncAction): IActionResult<T> {
        return dispatch => {
            const resolve = onResolve || ((dispatch, payload) => dispatch({ type, payload }))
            const reject = onReject || ((dispatch, error) => dispatch({ type, error }))

            dispatch({ type })

            return request
                .then(payload => resolve(dispatch, payload))
                .catch(error => reject(dispatch, error))
        }
    }

    /**
     * Process redux action, that toggle two values (true, false).
     * @param type Type of action.
     * @returns Action.
     */
    public static toggleAction(type: string): IToggleAction {
        return { type, toggle: true }
    }

    /**
     * Process set action, that set some property to value.
     * @param type Type of action.
     * @param value Value.
     * @returns Action.
     */
    public static setAction(type: string, value: any): ISetAction {
        return { type, value }
    }

    /**
     * Create redux reducer.
     * @param initialState Initial state of reducer.
     * @param specificReducer This is probably function, that contains switch of action types.
     * @returns Reducer.
     */
    public static createReducer(initialState: IStoreState, specificReducer?: IReducer): IReducer {
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
        if ('toggle' in action) {
            return {
                ...state,
                [action.type]: !state[action.type]
            }
        } else if ('value' in action) {
            return {
                ...state,
                [action.type]: action.value
            }
        } else {
            if (state[`${action.type}Sent`]) {
                if (action.error) {
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
                return {
                    ...state,
                    ...Redux.setEntity<T>(action.type, null, true, null)
                }
            }
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
            [`${actionType}`]: payload,
            [`${actionType}Sent`]: isSent,
            [`${actionType}Error`]: error
        }
    }

}

export default Redux