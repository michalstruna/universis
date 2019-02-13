// /bodies/{bodyId}.ts
// Routes like [GET] /bodies/10 or [POST] /bodies/20
export default {
    get: (req, res) => res.send('Hello world!')
    put: (req, res) => res.status(401).send('Admin required.')
    post: (req, res) => BodyModel.add(req.body).then(res.send)
    delete: (req, res) => res.send('Body was deleted.')
}
