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
     * @param {T[]} items
     * @param filter
     * @returns Filtered items.
     */
    public static apply(items: any[], filter: IFilter): any[] {
        const result = []

        for (const item of items) {
            if (Filter.isMatch(item, filter)) {
                result.push(item)
            }
        }

        return result
    }

    /**
     * Check if item matches filter.
     * @param item Item.
     * @param filter Filter.
     * @returns Item matches filter.
     */
    private static isMatch(item: any, filter: IFilter): boolean {
        for (const i in filter.value) {
            if (filter.value && filter.relation && filter.property && filter.value[i]) {
                switch (filter.relation[i]) {
                    case Filter.RELATIONS.CONTAINS:
                        return item[filter.property[i].toLowerCase()].includes(filter.value[i].toLowerCase())
                    case Filter.RELATIONS.STARTS_WITH:
                        return item[filter.property[i].toLowerCase()].startsWith(filter.value[i].toLowerCase())
                    case Filter.RELATIONS.ENDS_WITH:
                        return item[filter.property[i].toLowerCase()].endsWith(filter.value[i].toLowerCase())
                    case Filter.RELATIONS.EQUALS:
                        return item[filter.property[i].toLowerCase()] === filter.value[i].toLowerCase()
                    case Filter.RELATIONS.IS_LARGER:
                        return item[filter.property[i]] > filter.value[i].toLowerCase()
                    case Filter.RELATIONS.IS_SMALLER:
                        return item[filter.property[i]] < filter.value[i].toLowerCase()
                }
            }
        }

        return true
    }

}

export default Filter