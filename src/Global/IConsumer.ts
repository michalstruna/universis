/**
 * Consumer has only parameter, but not return value.
 */
declare type IConsumer<P> = (input: P) => void

/**
 * Double consumer has only two parameters, but not return value.
 */
declare type IConsumer2<P1, P2> = (input1: P1, input2: P2) => void

/**
 * Triple consumer has only three parameters, but not return value.
 */
declare type IConsumer3<P1, P2, P3> = (input1: P1, input2: P2, input3: P3) => void

/**
 * Triple consumer has only four parameters, but not return value.
 */
declare type IConsumer4<P1, P2, P3, P4> = (input1: P1, input2: P2, input3: P3, input4: P4) => void