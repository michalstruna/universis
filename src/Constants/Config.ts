export default {

    /**
     * Server port.
     */
    port: 3000,

    /**
     * Production domain.
     */
    domain: 'https://universis.herokuapp.com',

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
        senderName: 'Universis',
        subjectPrefix: 'Universis - ',
        sender: 'universis.root@gmail.com',
        clientId: '577962618556-no1hk301dub7a7u2rit6sivig5c2uprk.apps.googleusercontent.com',
        clientSecret: '8juXplA6FyvzxvGgBpFG0bbR',
        accessToken: 'ya29.Glv3BlSZSE1KXLDxUMZbbZlOjTbEJJOKi1C2Nc86xF8W7XQ4wvjTBITXnaUFd63qqfoE-xZVpNbX56ISUQBHoGh3_jR1_Ioje1zl6G5MrPQPZMOUsMn_CSomjPE7',
        refreshToken: '1/mGgU15jXJpDkPB8f9lFuBBXVZWtyYeCGBbtSgvktD_5--Y5GeMqzXPacUaCffxbZ'
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
    },

    file: {
        maxSize: 1048576 // Uploaded file (user avatar, body texture, ...) can have max. 1 MiB.
    }

}
