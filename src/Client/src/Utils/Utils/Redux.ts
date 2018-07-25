import ActionTypes from '../../Universe/Redux/ActionTypes'

type IState = any

type IAction<T> = {
    type: ActionTypes,
    payload?: T
    error?: string
}

type IActionResult<T> = IFunction<IConsumer<IAction<T>>, Promise<void>>

type IStoreValue = any

type IReducer = any

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
     * @return Runnable dispatch.
     */
    public static asyncAction<T>(request: Promise<T>, type: ActionTypes): IActionResult<T> {
        return dispatch => {
            dispatch({ type })

            return request
                .then(payload => dispatch({ type, payload }))
                .catch(error => dispatch({ type, error }))
        }
    }

    /**
     * Create redux reducer.
     * @param initialState Initial state of reducer.
     * @param specificReducer This is probably function, that contains switch of action types.
     * @returns Reducer.
     */
    public static createReducer(initialState: IState, specificReducer?: IReducer): IReducer {
        return <T>(state: IState = initialState, action: IAction<T>) => {
            const specificReducerResult = specificReducer ? specificReducer(state, action) : null
            return specificReducerResult || this.reducer(state, action)
        }
    }

    /**
     * Apply redux action and modify store.
     * @param state Current state of store.
     * @param action action.
     * @returns New state of store.
     */
    private static reducer<T>(state: IState, action: IAction<T>): IState {
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

    /**
     * Set value of entity (payload, isSent, error).
     * @param actionType Type of action.
     * @param payload Payload.
     * @param isSent Is sent value.
     * @param error Error value.
     * @returns Value of entity.
     */
    private static setEntity<T>(actionType: string, payload: T, isSent: boolean, error: string): IStoreValue {
        return {
            [`${actionType}`]: payload,
            [`${actionType}Sent`]: isSent,
            [`${actionType}Error`]: error
        }
    }

}

export default Redux