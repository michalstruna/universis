import ControlBar from '../Components/ControlBar'
import Units from '../Utils/Units'
import { ViewSizeControl } from '../../Controls'

/**
 * Layer between real-time simulator and redux actions.
 * There cannot be Redux store, because of performance.
 */
class Listener {

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

    }

}

export default Listener