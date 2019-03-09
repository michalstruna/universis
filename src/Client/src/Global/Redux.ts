declare namespace Universis {

    export namespace Redux {

        /**
         * Type of action body.
         * There can be object of changes or function, that accept state in parameter and returns changes.
         */
        export type Changes = Changes.Plain | Changes.Functional

        export namespace Changes {

            export type Plain = any
            export type Functional = any

        }

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