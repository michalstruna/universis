import * as JWT from 'jsonwebtoken'

import Model from './Model'
import { Config, Errors, Email, SocketMessageType } from '../Constants'
import DatabaseModel from '../Constants/DatabaseModel'
import UserModel from './UserModel'
import Security from '../Utils/Security'
import EmailModel from './EmailModel'
import SocketModel from './SocketModel'

class SecurityModel extends Model implements Universis.SecurityModel {

    private userDbModel: Universis.Database.Model

    constructor() {
        super()
        this.dbModel = this.db.getModel(DatabaseModel.TOKEN)
        this.userDbModel = this.db.getModel(DatabaseModel.USER)
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

            await UserModel.update({ email }, { isOnline: true })
            const user = await UserModel.get({ email })
            const token = await this.sign({ userId: user._id })

            await this.dbModel.addOne({ token })
            SocketModel.broadcast(SocketMessageType.LOGIN, user)
            return resolve({ ...user, token } as Universis.User.Identity)
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

    public verify(token: string): Promise<Universis.Map<any>> {
        return new Promise(async (resolve, reject) => {
            const count = await this.dbModel.count({ token })

            if (count === 0) {
                reject(Errors.NOT_FOUND)
            }

            JWT.verify(token, Config.security.token.secret, (error, payload) => {
                error ? reject(Errors.UNAUTHORIZED) : resolve(payload as Universis.Map<any>)
            })
        })
    }

    public async resetPassword(userId: string): Promise<void> {
        const user = await UserModel.get({ _id: userId }, { select: ['email'] })

        if (!user) {
            return Promise.reject(Errors.UNAUTHORIZED)
        }

        const token = await this.sign({ userId })

        await Promise.all([
            this.dbModel.addOne({ token }),
            EmailModel.sendText(user.email, Email.resetPassword.subject(), Email.resetPassword.content(token))
        ])
    }

    public async getUserByToken(token: string): Promise<Universis.User> {
        const dbToken = await this.dbModel.getOne({ token })

        if (!dbToken) {
            return Promise.reject(Errors.UNAUTHORIZED)
        }

        const data = await this.verify(token)
        return await UserModel.get({ _id: data.userId })
    }

}

export default new SecurityModel()