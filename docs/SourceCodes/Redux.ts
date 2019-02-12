// Actions.ts
export const increment = () => ({ type: ActionTypes.INCREMENT })

// Reducer.ts
...
case ActionTypes.INCREMENT:
    return {  ...state, number: state.number + 1 }
...

// IncrementButton.ts
class IncrementButton extends React.Component<IProps, IState> {

    render(): React.ReactNode {
        return (
            <button onClick={this.props.increment}>
                Increment number {this.props.number}
            </button>
        )
    }

}

export default IncrementButton.connect(
    state => ({ number: state.number }), // mapStateToProps
    { increment } // mapDispatchToProps
)
