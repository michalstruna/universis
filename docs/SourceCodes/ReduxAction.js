export const getBody = (bodyId: string) => (
    Redux.asyncAction(
        ActionTypes.GET_BODY,
        { body: Request.get(Paths.GET_BODY(bodyId)) }
    )
)
