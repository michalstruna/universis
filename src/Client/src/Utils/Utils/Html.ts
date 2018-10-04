/**
 * Utils for HTML.
 */
class Html {

    /**
     * Find parent of element by filter.
     * @param element Current element.
     * @param filter Filter for parents.
     * @returns Nearest parent, that matches filter.
     */
    public static findParent(element: HTMLElement, filter: IFunction<HTMLElement, boolean>): HTMLElement | null {
        while (element) {
            if (filter(element)) {
                return element
            }

            element = element.parentNode as HTMLElement
        }

        return null
    }

    /**
     * Check if element has parent.
     * @param element Current element.
     * @param filter Filter for parents.
     * @returns Element has parent.
     */
    public static hasParent(element: HTMLElement, filter: IFunction<HTMLElement, boolean>): boolean {
        return !!Html.findParent(element, filter)
    }

    /**
     * Check if element has class.
     * @param element Element
     * @param className Class of element.
     * @returns Element has class.
     */
    public static hasClass(element: HTMLElement, className: string): boolean {
        return element.className && element.className.split(' ').includes(className)
    }

}

export default Html