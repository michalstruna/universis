import Model from './Model'
import { DatabaseModel } from '../Constants'

class ApprovalModel extends Model implements Universis.Approval.Model {

    public constructor() {
        super()
        this.dbModel = this.db.getModel(DatabaseModel.APPROVAL)
    }

    public add(approval: Universis.Approval.New): Promise<Universis.Approval> {
        return this.dbModel.addOne(approval)
    }

    public async approve(approvalId: string): Promise<void> {

    }

    public async disapprove(approvalId: string): Promise<void> {

    }

    public getAll(): Promise<Universis.Approval[]> {
        return this.dbModel.get({})
    }


}

export default new ApprovalModel()