declare namespace Universis {

    export namespace Universe {

        export interface Body {

        }

        export namespace Body {

            export interface Simple {

            }

            export interface New {

            }

        }

        export interface Event extends Event.New {

            /**
             * ID of event.
             */
            _id: string

        }

        export namespace Event {

            export interface New {

                title: string

                description: string

                year: number



            }

        }

        export interface Comment {


        }

        export namespace Comment {

            export interface Simple {

            }

            export interface New {

            }

        }

    }

}