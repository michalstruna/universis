import Model from './Model'
import { ApprovalState, DatabaseModel, Operation, SubjectType, UserScore } from '../Constants'
import NotificationModel from './NotificationModel'

class ApprovalModel extends Model implements Universis.Approval.Model {

    private mapSubjectTypeToModel = {
        [SubjectType.EVENT]: DatabaseModel.BODY_EVENT,
        [SubjectType.BODY_TYPE]: DatabaseModel.BODY_TYPE,
        [SubjectType.BODY]: DatabaseModel.BODY
    }

    private userDbModel: Universis.Database.Model

    public constructor() {
        super()
        this.dbModel = this.db.getModel(DatabaseModel.APPROVAL)
        this.userDbModel = this.db.getModel(DatabaseModel.USER)
    }

    public async add(approval: Universis.Approval.New): Promise<Universis.Approval> {
        return this.dbModel.addOne<Universis.Approval>(approval)
    }

    public async approve(approvalId: string): Promise<void> {
        const approval = await this.dbModel.removeOne<Universis.Approval>({ _id: approvalId }, { join: ['notificationId'] })
        const model: Universis.Database.Model = this.db.getModel(this.mapSubjectTypeToModel[approval.notification.subjectType])

        if (model) {
            const { before, after, notification } = approval

            switch (notification.operation) {
                case Operation.ADD:
                    approval.after = await model.addOne(after)
                    approval.after = await model.getOne({ _id: approval.after._id }, { join: ['typeId'] })
                    break
                case Operation.DELETE:
                    approval.after = await model.removeOne({ _id: before._id })
                    break
                case Operation.UPDATE:
                    approval.after = await model.updateOne({ _id: before._id }, after)
                    break
            }

            const score = UserScore[notification.subjectType]

            if (notification.userId && score) {
                this.userDbModel.updateOne({ _id: notification.userId }, { $inc: { [`score.${score.type}`]: score.count } })
            }
        }

        NotificationModel.update({ _id: approval.notification._id }, {
            approvalState: ApprovalState.APPROVED,
            payload: approval
        } as any)
    }

    public async disapprove(approvalId: string): Promise<void> {
        const approval = await this.dbModel.removeOne<Universis.Approval>({ _id: approvalId })
        NotificationModel.update({ _id: approval.notificationId }, { approvalState: ApprovalState.DISAPPROVED } as any)
    }

    public get(filter: Universis.Database.Query.Filter): Promise<Universis.Approval> {
        return this.dbModel.getOne(filter, { join: ['notificationId'] })
    }

    public getAll(): Promise<Universis.Approval[]> {
        return this.dbModel.get({}, { join: ['notificationId'] })
    }

}

export default new ApprovalModel()