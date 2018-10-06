import ControlBar from '../Components/ControlBar'
import Units from '../Utils/Units'
import Canvas from '../Components/Canvas'
import { ViewSizeControl } from '../../Controls'

/**
 * Layer between real-time simulator and redux actions.
 * There cannot be Redux store, because of performance.
 */
class Listener {

    /**
     * Function to update view size in simulator.
     */
    public static updateSimulatorViewSize: IConsumer<number>

    /**
     * When view size in simulator is changed, update UI.
     * @param {number} viewSize Changed view size.
     */
    public static changeViewSizeFromSimulator(viewSize: number): void {
        if (ControlBar.viewSize) {
            ControlBar.viewSize.innerHTML = Units.formatSize(viewSize)
        }

        if (ViewSizeControl.instance) {
            ViewSizeControl.instance.setState({ viewSize })
        }
    }

    public static changeViewSizeFromUI(viewSize: number): void {
        if (Listener.updateSimulatorViewSize) {
            Listener.updateSimulatorViewSize(viewSize)
        }

        if (ControlBar.viewSize) {
            ControlBar.viewSize.innerHTML = Units.formatSize(viewSize)
        }
    }

}

export default Listener