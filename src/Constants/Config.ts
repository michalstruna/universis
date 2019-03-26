export default {

    /**
     * Server port.
     */
    port: 3000,

    /**
     * Database config.
     *
     * Plain connection string is
     * "[prefix]://[host]/[database]?[option1]=[value1]&[option2]=[value2]".
     *
     * Authenticated connection string is
     * "[prefix]://[username]:[password]@[host]/[database]?[option1]=[value1]&[option2]=[value2]".
     */
    database: {
        prefix: 'mongodb+srv', // 'mongodb+srv' for Atlas.
        username: 'michal', // Optional.
        password: 'mathrandom97', // Optional.
        host: 'universis-yasip.mongodb.net', // 'universis-yasip.mongodb.net' for Atlas.
        name: 'universis',
        options: {
            retryWrites: false
        }
    },

    /**
     * Email config.
     */
    email: {
        service: 'Gmail', // One of https://nodemailer.com/smtp/well-known.
        sender: 'michal.l.struna@gmail.com',
        password: '...',
        senderName: 'Universis',
        subjectPrefix: 'Universis - ',
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
