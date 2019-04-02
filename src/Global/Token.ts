/**
 * Interfaces for token.
 */
declare namespace Universis {

    export interface Token extends Token.New {

        _id: string

    }

    export namespace Token {

        export interface New {

            token: string

        }

    }

}