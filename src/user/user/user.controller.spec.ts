import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http'
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should show say hello', async () => {
    const response = await controller.sayHello('Fuad Muhammad Nur')
    expect(response).toBe('Hello Fuad Muhammad Nur')
  })

  it('should can view template', async () => {
    const response = httpMock.createResponse();
    controller.viewHello('Fuad', response)

    expect(response._getRenderView()).toBe('index.html')
    expect(response._getRenderData()).toEqual({
      name: 'Fuad',
      title: 'Template Engine Express'
    })
  })
});
