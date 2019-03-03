/**
 * Filter utils.
 */
class Filter {

    /**
     * Relations between fields and their values.
     */
    public static readonly RELATIONS = {
        CONTAINS: '$contains',
        EQUALS: '$equals',
        STARTS_WITH: '$startsWith',
        ENDS_WITH: '$endsWith',
        IS_SMALLER: '$isSmaller',
        IS_LARGER: '$isLarger'
    }

    /**
     * Filter array of objects by nested properties.
     * @param items
     * @param filter
     * @returns Filtered items.
     */
    public static apply(items: any[], filter: Universis.Filter): any[] {
        if (!Filter.isValidFilter(filter)) {
            return items
        }

        const result = []

        for (const item of items) {
            if (Filter.isMatch(item, filter)) {
                result.push(item)
            }
        }

        return result
    }

    /**
     * Remove nth rule from filter.
     * @param filter Filter.
     * @param index Index of rule to be removed.
     * @returns Filter without nth rule.
     */
    public static removeNthRule(filter: Universis.Filter, index: number): Universis.Filter {
        const newFilter = Filter.getInitialFilter()

        for (let i = 0; i < filter.relation.length; i++) {
            if (i !== index) {
                newFilter.property.push(filter.property[i])
                newFilter.relation.push(filter.relation[i])
                newFilter.value.push(filter.value[i])
            }
        }

        return newFilter
    }

    /**
     * Get empty filter.
     * @returns Empty filter.
     */
    public static getInitialFilter(): Universis.Filter {
        return {
            property: [],
            relation: [],
            value: []
        }
    }

    /**
     * Fill all parts (property, relation and value) of filter to same size.
     * @param filter Filled filter.
     * @param initialProperty
     * @param initialRelation
     * @param initialValue
     * @param length Length of filter (optional, default is length of largest part of filter).
     */
    public static fillFilter(filter: Universis.Filter, initialProperty: string, initialRelation: string, initialValue: string, length?: number): Universis.Filter {
        if (!Filter.isValidFilter(filter)) {
            return filter
        }

        const filledFilter = Filter.getInitialFilter()
        const maxSize = length || Math.max(filter.property.length, filter.relation.length, filter.value.length)

        for (let i = 0; i < maxSize; i++) {
            filledFilter.property[i] = filter.property[i] || initialProperty
            filledFilter.relation[i] = filter.relation[i] || initialRelation
            filledFilter.value[i] = filter.value[i] || initialValue
        }

        return filledFilter
    }

    /**
     * Check if item matches filter.
     * @param item Item.
     * @param filter Filter.
     * @returns Item matches filter.
     */
    private static isMatch(item: Universis.Map<any>, filter: Universis.Filter): boolean {
        for (const i in filter.value) {
            if (filter.value && filter.relation && filter.property && filter.value[i] && filter.relation[i] && filter.property[i]) {
                let property = Filter.getProperty(item, filter.property[i])

                if (!Filter.isMatchValue(filter, property, i)) {
                    return false
                }
            }
        }

        return true
    }

    private static isMatchValue(filter: Universis.Filter, property: any, i: string): boolean {
        if (Number.isInteger(property) || typeof property === 'number') {
            switch (filter.relation[i]) {
                case Filter.RELATIONS.CONTAINS:
                    return property.toString().includes(filter.value[i])
                case Filter.RELATIONS.STARTS_WITH:
                    return property.toString().startsWith(filter.value[i])
                case Filter.RELATIONS.ENDS_WITH:
                    return property.toString().endsWith(filter.value[i])
                case Filter.RELATIONS.EQUALS:
                    return property.toString() === filter.value[i].toString()
                case Filter.RELATIONS.IS_LARGER:
                    return property > filter.value[i]
                case Filter.RELATIONS.IS_SMALLER:
                    return property < filter.value[i]
            }
        } else if (typeof property === 'string') {
            property = property.toLowerCase()
            const value = filter.value[i].toLowerCase()

            switch (filter.relation[i]) {
                case Filter.RELATIONS.CONTAINS:
                    return property.includes(value)
                case Filter.RELATIONS.STARTS_WITH:
                    return property.startsWith(value)
                case Filter.RELATIONS.ENDS_WITH:
                    return property.endsWith(value)
                case Filter.RELATIONS.EQUALS:
                    return property === value
                case Filter.RELATIONS.IS_LARGER:
                    return property > value
                case Filter.RELATIONS.IS_SMALLER:
                    return property < value
            }
        }

        return false
    }

    /**
     * Get property by string key.
     * @param item Some object.
     * @param key Key. For nested properties there is "." delimiter.
     * @returns Value of property.
     */
    private static getProperty(item: Universis.Map<any>, key: string): any {
        let property = item
        const keys = key.split('.')

        for (const key of keys) {
            if (!property) {
                return null
            }

            property = property[key]
        }

        return property
    }

    /**
     * Check if filter is valid.
     * @param filter Filter.
     * @returns Filter is valid.
     */
    private static isValidFilter(filter: Universis.Filter) {
        return filter && filter.property && filter.value && filter.relation
    }

}

export default Filter