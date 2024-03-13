import { Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('/api/user')
export class UserController {
  @Get('/hello')
  sayHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string
  ) {
    return `Hello ${firstName || ''} ${lastName || ''}`
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