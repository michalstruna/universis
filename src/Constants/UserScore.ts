import SubjectType from './SubjectType'

export default {

    FIRST_DAY_LOGIN: { type: 'bronze', count: 1 },
    [SubjectType.BODY]: { type: 'gold', count: 2 },
    [SubjectType.POST]: { type: 'silver', count: 1 },
    [SubjectType.BODY_TYPE]: { type: 'gold', count: 1 },
    [SubjectType.EVENT]: { type: 'gold', count: 1 },
    [SubjectType.MESSAGE]: { type: 'bronze', count: 1 },
    [SubjectType.POST_VOTE]: { type: 'bronze', count: 1 }

}