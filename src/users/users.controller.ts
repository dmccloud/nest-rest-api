import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  type UserObjUpdateType,
  type UserObjType,
  UsersService,
} from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users or /users?role=value
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    console.log(role);
    return this.usersService.findAll(role);
  }

  // GET /users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  // POST /users
  @Post()
  createUser(@Body() user: UserObjType) {
    return this.usersService.createUser(user);
  }

  // PATCH /users/:id
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() userUpdate: UserObjUpdateType) {
    return this.usersService.updateUser(parseInt(id), userUpdate);
  }

  // DELETE /users/:id
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(parseInt(id));
  }
}
