export default Redux.createReducer(
    Object.values(ActionTypes),
    {
        areLabelsVisible: true,
        areOrbitsVisible: false,
        bodies: Redux.EMPTY_ASYNC_ENTITY,
        body: Redux.EMPTY_ASYNC_ENTITY
    }
)
