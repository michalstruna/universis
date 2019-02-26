import ControlBar from '../Components/ControlBar'
import Units from '../../Utils/Utils/Units'

/**
 * Layer between real-time simulator and redux actions.
 * There cannot be Redux store, because of performance.
 */
class Listener {

    /**
     * Function to update view size in simulator.
     */
    public static updateSimulatorViewSize: Universis.Consumer<number>

    /**
     * View size element.
     */
    public static viewSizeElement: HTMLElement

    /**
     * View size slider.
     */
    public static viewSizeSlider: React.Component

    /**
     * When view size in simulator is changed, update UI.
     * @param {number} viewSize Changed view size.
     */
    public static changeViewSizeFromSimulator(viewSize: number): void {
        if (Listener.viewSizeElement) {
            Listener.viewSizeElement.innerHTML = Units.toFull(viewSize, Units.SIZE.KM, Units.SIZE)
        }

        if (Listener.viewSizeSlider) {
            Listener.viewSizeSlider.setState({ viewSize })
        }
    }

    public static changeViewSizeFromUI(viewSize: number): void {
        if (Listener.updateSimulatorViewSize) {
            Listener.updateSimulatorViewSize(viewSize)
        }

        if (Listener.viewSizeElement) {
            Listener.viewSizeElement.innerHTML = Units.toFull(viewSize, Units.SIZE.KM, Units.SIZE)
        }
    }

}

export default Listener