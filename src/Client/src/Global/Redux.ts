declare namespace Universis {

    export namespace Redux {

        /**
         * Interface for redux action.
         */
        export interface Action {
            type: string
            $callback?: Universis.Runnable
        }

        /**
         * Interface for async action.
         */
        export interface AsyncAction<T> extends Action {
            property: string
            $async: AsyncEntity<T>
        }

        /**
         * Interface for set action.
         */
        export interface SetAction extends Action {
            $set: Universis.Map<any>
        }

        /**
         * Type for async action result.
         */
        export type ActionResult<T> = Universis.Function<Universis.Consumer<AsyncAction<T>>, Promise<T>>

        /**
         * Type for redux store state.
         */
        export type StoreState = any

        /**
         * Interface for async data container.
         */
        export interface AsyncEntity<T> {
            payload?: T
            isSent?: boolean
            error?: number
        }

        /**
         * Interface for router location.
         */
        export interface Location {
            hash: string
            pathname: string
            search: string
        }

        /**
         * Interface for location target.
         */
        export interface LocationTarget {
            pathname?: string
            query?: Universis.Map<string>
        }

    }

}