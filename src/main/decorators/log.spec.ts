import { Controller } from '../../presentation/protocols'
import { HttpRequest, HttpResponse } from './../../presentation/protocols/http'
import { LogControllerDecorator } from './log'

describe('Log decorator', () => {
  test('should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          statusCode: 200,
          body: {
            email: 'any_mail@mail.com',
            name: 'anu_name',
            password: 'any_password',
            passwordConfirmation: 'any_password'
          }
        }
        return await new Promise(resolve => resolve(httpResponse))
      }
    }
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest: HttpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'anu_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
