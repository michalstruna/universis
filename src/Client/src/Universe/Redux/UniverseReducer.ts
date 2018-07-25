import { Redux } from '../../Utils'
const ActionTypes: any = {}

export default Redux.createReducer({})


/*const initialState = {

    bodies: null,
    isGetBodiesSent: false,
    getBodiesError: null

}

export default function (state = initialState, action: any) {
    switch (action.type) {

        case ActionTypes.GET_BODIES_SENT:
            return {
                ...state,
                isGetBodiesSent: true
            }

        case ActionTypes.GET_BODIES_SUCCESS:
            return {
                ...state,
                bodies: action.bodies,
                isGetBodiesSent: false,
                getBodiesError: null
            }

        case ActionTypes.GET_BODIES_FAIL:
            return {
                ...state,
                isGetBodiesSent: false,
                getBodiesError: action.error
            }

        default:
            return state

    }
}*/