/**
 * Interface for new body type.
 */
declare interface INewBodyType {

    /**
     * Name of body type.
     */
    name: string

    /**
     * Color of body light.
     */
    emissiveColor?: number

}


/**
 * Interface for body type.
 */
declare interface IBodyType extends INewBodyType {

    /**
     * Unique identifier of body type.
     */
    _id: string

}