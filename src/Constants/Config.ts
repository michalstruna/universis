export default {

    /**
     * Port of server.
     */
    port: 1997,

    /**
     * Data about database.
     */
    database: {
        username: 'michal',
        password: 'mathrandom97',
        cluster: 'universis',
        name: 'universis'
    },

    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Token'
        // TODO: Cache.
        //response.header('Cache-Control', 'public, max-age=3600')
    }

}