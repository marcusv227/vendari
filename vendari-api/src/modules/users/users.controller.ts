import { Controller, Get, Post, Body, Delete, Param, Put, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  
  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string){
    const userId = parseInt(id, 10)
    return this.usersService.delete(userId)
  }

  @Patch('/edit/:id')
  async editUser(
    @Param('id') id: string,
    @Body() editUser: UpdateUserDto,
  ): Promise<User> {
    const userId = parseInt(id, 10)
    return this.usersService.edit(userId, editUser)
  }
}
