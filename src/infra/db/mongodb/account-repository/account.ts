import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await result.ops[0]
    const { _id, ...accountWithoutId } = account
    console.log(account)
    // eslint-disable-next-line @typescript-eslint/return-await
    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
