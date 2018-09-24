import ActionTypes from './ActionTypes'
import { Redux, Queries, Url } from '../../Utils'

export default Redux.createReducer(
    Object.values(ActionTypes),
    {
        tab: Url.getQuery(window.location.search, Queries.PANEL) || Queries.OVERVIEW
    }
)