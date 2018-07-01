export default {
    ALL: { PATH: '*' },
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
            PATH: '/users',
            ADD_USER: { PATH: '/add' },
            GET_USERS: { PATH: '/' },
            GET_UNAUTH_USER_BY_EMAIL: { PATH: '/unauth/:email' }
        }
    }
}