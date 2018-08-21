/**
 * Class for events.
 */
class Event {

    // TODO: Fix.

    private constructor() {

    }

    static MOUSE_EVENTS = [
        'onClick',
        'onContextMenu',
        'onDoubleClick',
        'onDrag',
        'onDragEnd',
        'onDragEnter',
        'onDragExit',
        'onDragLeave',
        'onDragOver',
        'onDragStart',
        'onDrop',
        'onMouseDown',
        'onMouseEnter',
        'onMouseLeave',
        'onMouseMove',
        'onMouseOut',
        'onMouseOver',
        'onMouseUp'
    ]

    /**
     * Stop propagation of any event.
     * @param event
     */
    static stopPropagation = (event: any) => {
        event.stopPropagation()
    }

    /**
     * Get react props for stop propagation of all events.
     * @returns Props.
     */
    static getReactStopPropagationProps() {
        const props = {}

        for (const event of Event.MOUSE_EVENTS) {
            props[event] = Event.stopPropagation
        }

        return props
    }

}

export default Event