/**
 * Runnable have no parameter and return value.
 */
declare type IRunnable = () => void

/**
 * Consumer has one parameter, but not return value.
 */
declare type IConsumer<P> = (input: P) => void

/**
 * Consumer2 has two parameters, but not return value.
 */
declare type IConsumer2<P1, P2> = (input1: P1, input2: P2) => void

/**
 * Consumer3 has three parameters, but not return value.
 */
declare type IConsumer3<P1, P2, P3> = (input1: P1, input2: P2, input3: P3) => void

/**
 * Supplier has only return value, but not parameter.
 */
declare type ISupplier<T> = () => T

/**
 * Function has some parameter and return value.
 */
declare type IFunction<P, T> = (input: P) => T

/**
 * Function2 has two parameters and return value.
 */
declare type IFunction2<P1, P2, T> = (parameter1: P1, parameter2: P2) => T