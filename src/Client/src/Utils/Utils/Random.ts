/**
 * Utils for random numbers.
 */
class Random {

    /**
     * Generate pseudo-random real with uniform distribution.
     * @param min
     * @param max
     * @returns Pseudo-random number.
     */
    public static uniform(min: number, max: number): number {
        return Math.random() * (max - min) + min
    }

    /**
     * Generate pseudo-random real with normal distribution.
     * @param mean
     * @param std
     * @returns Pseudo-random number.
     */
    public static normal(mean: number, std: number): number {
        let x = 0

        for (let i = 1; i <= 12; i++) {
            x += Math.random()
        }

        return (x - 6) * std + mean
    }

    /**
     * Generate pseudo-random real with exponential distribution.
     * @param lambda
     * @returns Pseudo-random number.
     */
    public static exp(lambda) {
        return Math.pow(lambda, 2) * Math.log10(1 - Math.random()) / (-lambda)
    }

    /**
     * Generate pseudo-random integer with uniform distribution.
     * @param min
     * @param max
     * @returns Pseudo-random number.
     */
    public static uniformInt(min: number, max: number): number {
        return Math.floor(this.uniform(min, max) + 1)
    }

    /**
     * Generate pseudo-random integer with normal distribution.
     * @param mean
     * @param std
     * @returns Pseudo-random number.
     */
    public static normalInt(mean: number, std: number): number {
        return Math.floor(this.normal(mean, std) + 1)
    }

    /**
     * Generate pseudo-random number with exponential distribution.
     * @param lambda
     * @returns Pseudo-random number.
     */
    public static expInt(lambda) {
        return Math.floor(this.exp(lambda))
    }

    /**
     * Generate pseudo-random number with exponential distribution.
     * @param lambda
     * @returns Pseudo-random number.
     */
    public static reversedExpInt(lambda) {
        return lambda - this.expInt(lambda)
    }

}

export default Random