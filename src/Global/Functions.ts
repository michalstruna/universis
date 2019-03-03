declare namespace Universis {

    /**
     * Runnable have no parameter and return value.
     */
    export type Runnable = () => void

    /**
     * Consumer has one parameter, but not return value.
     */
    export type Consumer<P> = (input: P) => void

    /**
     * Consumer2 has two parameters, but not return value.
     */
    export type Consumer2<P1, P2> = (input1: P1, input2: P2) => void

    /**
     * Consumer3 has three parameters, but not return value.
     */
    export type Consumer3<P1, P2, P3> = (input1: P1, input2: P2, input3: P3) => void

    /**
     * Consumer4 has four parameters, but not return value.
     */
    export type Consumer4<P1, P2, P3, P4> = (input1: P1, input2: P2, input3: P3, input4: P4) => void

    /**
     * Consumer5 has five parameters, but not return value.
     */
    export type Consumer5<P1, P2, P3, P4, P5> = (input1: P1, input2: P2, input3: P3, input4: P4, input5: P5) => void

    /**
     * Supplier has only return value, but not parameter.
     */
    export type Supplier<T> = () => T

    /**
     * Function has some parameter and return value.
     */
    export type Function<P, T> = (input: P) => T

    /**
     * Function2 has two parameters and return value.
     */
    export type Function2<P1, P2, T> = (parameter1: P1, parameter2: P2) => T

}