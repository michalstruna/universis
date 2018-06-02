import Component from './Component'

interface IState {

}

/**
 * Parent of all stateless components without state.
 */
class SimpleComponent<IProps> extends Component<IProps, IState> {

}

export default SimpleComponent