import * as Bcrypt from 'bcrypt'
import * as JWT from 'jsonwebtoken'

import Model from './Model'
import { Config, Errors } from '../Constants'
import DatabaseModels from '../Constants/DatabaseModels'
import UserModel from './UserModel'

class SecurityModel extends Model implements ISecurityModel {

    private userDbModel: IDatabaseModel

    constructor() {
        super()
        this.dbModel = this.db.getModel(DatabaseModels.TOKEN)
        this.userDbModel = this.db.getModel(DatabaseModels.USER)
    }

    public authenticate(username: string, secret: string): Promise<IUserIdentity> {
        return new Promise(async (resolve, reject) => {
            const userPassword = await this.userDbModel
                .getOne({ email: username })
                .run<{ password: string }>()

            if (!userPassword) {
                reject(Errors.NOT_FOUND) // User not found.
            }

            if (!await this.isAuthenticated(secret, userPassword.password)) {
                reject(Errors.INVALID) // Invalid password.
            }

            const user = await UserModel.getOne({ email: username })
            const token = await this.sign(user._id)
            await this.dbModel.add({ token })
            return { ...user, token }
        })


    }

    public unsign(token: string): Promise<string> {
        return this.dbModel.count({ token }).then(count => {
            if (count === 1) {
                JWT.verify(token, Config.security.token.secret, (error, payload) => (
                    error ? Promise.reject(Errors.INVALID) : payload
                ))
            } else {
                return Promise.reject(Errors.NOT_FOUND)
            }
        })
    }

    public hash(text: string): Promise<string> {
        return Bcrypt.hash(text, Config.security.hash.rounds)
    }

    public isAuthenticated(secret: string, hashedSecret: string): Promise<boolean> {
        return Bcrypt.compare(secret, hashedSecret)
    }

    public sign(payload: any): Promise<string> {
        return new Promise((resolve, reject) => (
            JWT.sign(payload, Config.security.token.secret, {
                expiresIn: Config.security.token.expiration
            }, (error, token) => error ? reject(error) : resolve(token))
        ))
    }

}

export default new SecurityModel()