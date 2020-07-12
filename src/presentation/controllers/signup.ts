import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../error/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httRequest: HttpRequest): HttpResponse {
    if (!httRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
