import * as JWT from 'jsonwebtoken'

import Model from './Model'
import { Config, Errors } from '../Constants'
import DatabaseModels from '../Constants/DatabaseModels'
import UserModel from './UserModel'
import Security from '../Utils/Security'

class SecurityModel extends Model implements Universis.SecurityModel {

    private userDbModel: Universis.Database.Model

    constructor() {
        super()
        this.dbModel = this.db.getModel(DatabaseModels.TOKEN)
        this.userDbModel = this.db.getModel(DatabaseModels.USER)
    }

    public authenticate(email: string, secret: string): Promise<Universis.User.Identity> {
        return new Promise(async (resolve, reject) => {
            const password = await this.userDbModel.getField<string>({ email }, 'password')

            if (!password) {
                return reject(Errors.NOT_FOUND) // User not found.
            }

            if (!await this.isAuthenticated(secret, password)) {
                return reject(Errors.INVALID) // Invalid password.
            }

            const user = await UserModel.getOne({ email })
            const token = await this.sign({ _id: user._id })

            await this.dbModel.addOne({ token })
            return resolve({ ...user, token })
        })
    }

    public hash(text: string): Promise<string> {
        return Security.hash(text)
    }

    public isAuthenticated(secret: string, hashedSecret: string): Promise<boolean> {
        return Security.isAuthenticated(secret, hashedSecret)
    }

    public sign(payload: Universis.Map<any>): Promise<string> {
        return Security.sign(payload)
    }

    public unsign(token: string): Promise<Universis.Map<any>> {
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

}

export default new SecurityModel()