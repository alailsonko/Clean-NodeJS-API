import { Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    // eslint-disable-next-line @typescript-eslint/return-await
    return null
  }
}
