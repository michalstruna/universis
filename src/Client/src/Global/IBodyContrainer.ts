declare namespace Universis {

    export namespace Universe {

        export namespace Body {

            /**
             * Interface for body container.
             */
            export interface Container {

                /**
                 * Getter for data about body.
                 */
                readonly data: Universis.Universe.Body.Simple

                /**
                 * Getter for THREE mesh.
                 */
                readonly mesh: THREE.Mesh

                /**
                 * Getter for THREE mesh orbit.
                 */
                readonly orbit: THREE.Group

                /**
                 * Getter for label.
                 */
                readonly label: HTMLElement

                /**
                 * Container for all children of body.
                 */
                readonly childrenContainer: THREE.Group

                /**
                 * Parent.
                 */
                parent?: Container

            }

        }

    }

}