import * as Express from 'express'

class Server implements IServer {

    /**
     * @var express Instance of Express framework.
     */
    private express: Express.Express

    constructor() {
        this.express = Express()
    }

    public getRouter(): Express.Express {
        return this.express
    }

    public setStatic(path: string) {
        this.express.use(Express.static(path))
    }

    public run(port: number): void {
        const runningServer = this.express.listen(port, () => {
            const info: any = runningServer.address()
            console.log(`Server is running on ${info.address}:${info.port}.`)
        })
    }

}

export default Server