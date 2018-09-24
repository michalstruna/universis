/**
 * Interface for redux action.
 */
declare interface IAction {
    type: string
    $callback?: IRunnable
}

/**
 * Interface for async action.
 */
declare interface IAsyncAction<T> extends IAction {
    property: string
    $async: IAsyncData<T>
}

/**
 * Interface for set action.
 */
declare interface ISetAction extends IAction {
    $set: IObject<any>
}

/**
 * Interface for action.
 */
declare interface IToggleAction extends ISetAction {
    $toggle: IObject<boolean>
}

/**
 * Interface for increment action.
 */
declare interface IIncrementAction extends IAction {
    $increment: IObject<number>[]
}

/**
 * // TODO
 */
declare interface IModifyAction extends IAction {
    $modify: (state: IStoreState) => IStoreState
}

/**
 * Type for async action result.
 */
declare type IActionResult<T> = IFunction<IConsumer<IAsyncAction<T>>, Promise<T>>

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

/**
 * Interface for async data container.
 */
declare interface IAsyncData<T> {
    payload?: T
    isSent?: boolean
    error?: number
}

/**
 * Interface for router location.
 */
declare interface ILocation {
    hash: string
    pathname: string
    search: string
}

/**
 * Interface for location target.
 */
declare interface ILocationTarget {
    pathname?: string
    query?: IObject<string>
}