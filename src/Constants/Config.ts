export default {

    /**
     * Server port.
     */
    port: 3000,

    /**
     * Database config.
     */
    database: {
        prefix: 'mongodb+srv', // 'mongo' for local server
        username: 'michal',
        password: 'mathrandom97',
        host: 'universis-yasip.mongodb.net', // localhost:27017 for local server
        name: 'universis'
    },

    /**
     * Email config.
     */
    email: {
        service: 'gmail',
        sender: 'michal.l.struna@gmail.com',
        password: '...'
    },

    /**
     * HTTP headers.
     */
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Token'
        // TODO: Cache.
        //response.header('Cache-Control', 'public, max-age=3600')
    },

    security: {
        token: {
            secret: 'NNYR7KI9mTppuHyrGSShvjrTvE85voc2oku7U7e8kiq5blWjDLZ60kbaFF88ZyhV1JuLul2LQr1ABObVDoZqg7Z8at7b2WadLHy2',
            expiration: '30m'
        },
        hash: {
            rounds: 10
        }
    }

}