import ActionTypes from './ActionTypes'
import { Redux, Queries, Url } from '../../Utils'

export default Redux.createReducer(
    Object.values(ActionTypes),
    {
        tab: Url.getQuery(Queries.PANEL) || Queries.OVERVIEW,
        newNotification: Redux.EMPTY_ASYNC_ENTITY,
        notifications: Redux.EMPTY_ASYNC_ENTITY,
        isBodyFormVisible: false,
        isBodyEventFormVisible: false,
        isBodyTypeFormVisible: false,
        selectedEvent: Redux.EMPTY_ENTITY
    }
)