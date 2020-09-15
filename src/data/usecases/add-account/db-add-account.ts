import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  Encrypter
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    // eslint-disable-next-line @typescript-eslint/return-await
    return new Promise(resolve => resolve(null))
  }
}
