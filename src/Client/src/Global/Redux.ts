/**
 * Interface for async action.
 */
declare interface IAction<T> {
    type: string,
    payload?: T
    error?: string
}

/**
 * Type for async action result.
 */
declare type IActionResult<T> = IFunction<IConsumer<IAction<T>>, Promise<void>>

/**
 * Type for reducer entity (isSent, payload, fail).
 */
declare type IReducerEntity = any

/**
 * Type for redux store state.
 */
declare type IState = any

/**
 * Type for redux reducer.
 */
declare type IReducer = (IState, IAction) => IState