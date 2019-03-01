/**
 * Utils for keys.
 */
class Keyboard {

    /**
     * List of all events.
     */
    private static keyMap: Universis.Map<Universis.Runnable> = {}

    /**
     * Handler for keyUp event.
     */
    private static handleKeyUp: Universis.Consumer<KeyboardEvent>

    /**
     * Set events to keys.
     * @param events List of events, where keys are keys and values callbacks.
     * @param reset Old key events will be removed.
     */
    public static set(events: Universis.Map<Universis.Runnable>, reset: boolean = false): void {
        if (reset) {
            this.clear()
        }

        for (const key in events) {
            this.keyMap[key.toLowerCase()] = events[key]
        }

        this.update()
    }

    /**
     * Clear events.
     * @param keys List of keys, that will be cleared. If not specified, all keys will be cleared.
     */
    public static clear(...keys: string[]): void {
        if (keys.length === 0) {
            keys = Object.keys(this.keyMap)
        }

        for (const key of keys) {
            delete this.keyMap[key]
        }
    }

    /**
     * Update window keyup events from current keyMap.
     */
    private static update(): void {
        if (this.handleKeyUp) {
            window.removeEventListener('keyup', this.handleKeyUp)
        }

        this.handleKeyUp = event => {
            const key = event.key.toLowerCase()

            if (this.keyMap[key]) {
                this.keyMap[key]()
            }
        }

        window.addEventListener('keyup', this.handleKeyUp)
    }

}

export default Keyboard