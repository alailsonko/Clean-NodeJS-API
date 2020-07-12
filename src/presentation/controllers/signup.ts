import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../error/missing-param-error'

export class SignUpController {
  handle (httRequest: HttpRequest): HttpResponse {
    if (!httRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
