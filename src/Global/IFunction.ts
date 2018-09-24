/**
 * Function has some parameter and return value.
 */
declare type IFunction<T, E> = (input: T) => E

/**
 * Function2 has two parameters and return value.
 */
declare type IFunction2<P1, P2, T> = (parameter1: P1, parameter2: P2) => T