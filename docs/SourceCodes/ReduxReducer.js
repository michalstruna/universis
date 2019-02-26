export default Redux.createReducer(
    Object.values(ActionTypes),
    {
        isNameVisible: true,
        areOrbitsVisible: false,
        bodies: Redux.EMPTY_ASYNC_ENTITY,
        body: Redux.EMPTY_ASYNC_ENTITY
    }
)
