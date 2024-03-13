import { Controller, Get, Header, HttpCode, HttpRedirectResponse, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
  constructor(private service: UserService) { }

  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'Template Engine Express',
      name: name
    })
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success set cookie')
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request) {
    return request.cookies['name']
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'Hello JSON'
    }
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/user/sample-response',
      statusCode: 301
    }
  }

  @Get('/hello')
  async sayHello(
    @Query('name') name: string,
  ): Promise<string> {
    return this.service.sayHello(name)
  }

  @Get('/:id')
  getById(@Param('id') id: string): string {
    return `GET ${id}`
  }

  @Post()
  post(): string {
    return 'POST'
  }

  @Get('/sample')
  get(): string {
    return 'GET';
  }
}
