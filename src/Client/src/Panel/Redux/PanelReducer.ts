import { Redux, Queries, Url } from '../../Utils'

export default Redux.createReducer({
    panelTab: Url.getQuery(window.location.search, Queries.PANEL) || Queries.OVERVIEW
})