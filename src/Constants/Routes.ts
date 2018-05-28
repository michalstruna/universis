export default {
    API: {
        PATH: '/api',
        UNIVERSE: {
            PATH: '/universe',
            ADD_BODY: { PATH: '/body' },
            GET_BODIES: { PATH: '/bodies' },
            GET_BODY_BY_ID: { PATH: '/body/:bodyId' },
            REMOVE_BODY_BY_ID: { PATH: '/body/:bodyId' },
            UPDATE_BODY: { PATH: '/body' }
        },
        USER: {
            PATH: '/user',
            ADD_USER: { PATH: '/user' },
            GET_ONLINE_USERS: { PATH: '/online' },
            GET_USER_BY_ID: { PATH: '/user/:userId' },
            GET_USERS: { PATH: '/users' },
            LOG_IN_USER: { PATH: '/log-in' },
            REMOVE_USER_BY_ID: { PATH: '/user/:userId' },
            UPDATE_USER: { PATH: '/user' }
        }
    }
}