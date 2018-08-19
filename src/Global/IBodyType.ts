/**
 * Interface for body type.
 */
declare interface IBodyType {

    /**
     * Unique identifier of body type.
     */
    _id: string

    /**
     * Name of body type.
     */
    name: string

    /**
     * Color of body light.
     */
    emissiveColor?: number

}