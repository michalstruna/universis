export default {
    ALL: { PATH: '*' },
    API: {
        PATH: '/api',
        UNIVERSE: {
            PATH: '/universe',
            ADD_BODY: { PATH: '/bodies' },
            GET_BODIES: { PATH: '/bodies' },
            GET_BODY_BY_ID: { PATH: '/bodies/:bodyId' },
            REMOVE_BODY_BY_ID: { PATH: '/bodies/:bodyId' },
            UPDATE_BODY: { PATH: '/bodies' }
        },
        USER: {
            PATH: '/users',
            ADD_USER: { PATH: '/add' }, // TODO: PATH without add?
            GET_USERS: { PATH: '/' },
            GET_UNAUTH_USER_BY_EMAIL: { PATH: '/unauth/:email' }
        }
    }
}