import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { serverError } from '../../presentation/helpers/http-helper'
import { Controller } from '../../presentation/protocols'
import { HttpRequest, HttpResponse } from './../../presentation/protocols/http'
import { LogControllerDecorator } from './log'

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'any_name'
        }
      }
      return await new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_mail@mail.com',
    name: 'anu_name',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}
const makeSut = (): SutTypes => {
  const logErrorRepositoryStub = makeLogErrorRepository()
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('Log decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })
  test('should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const expected = {
      statusCode: 200,
      body: {
        name: 'any_name'
      }
    }
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(expected)
  })
  test('should call LogErrorRepository with correct error if controller returns a server error,', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)))

    await sut.handle(makeFakeRequest())
    expect(logSpy).toHaveBeenCalledWith(fakeError.stack)
  })
})
