/**
 * Interface for async action.
 */
declare interface IAsyncAction<T> {
    type: string,
    payload?: T
    error?: string
}

/**
 * Interface for action.
 */
declare interface IToggleAction {
    type: string,
    toggle: boolean
}

/**
 * Interface for set action.
 */
declare interface ISetAction<T> {
    type: string,
    value: T
}

/**
 * Type for async action result.
 */
declare type IActionResult<T> = IFunction<IConsumer<IAsyncAction<T>>, Promise<void>>

/**
 * Type for reducer entity (isSent, payload, fail).
 */
declare type IReducerEntity = any

/**
 * Type for redux store state.
 */
declare type IStoreState = any

/**
 * Type for redux reducer.
 */
declare type IReducer = (IState, IAction) => IStoreState

/**
 * Type of dispatch action function.
 */
declare type IDispatch = IConsumer<any>