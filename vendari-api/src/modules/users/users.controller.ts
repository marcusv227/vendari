import { Controller, Get, Post, Body, Delete, Param, Put, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiBearerAuth()
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
  
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: number){
    return this.usersService.delete(Number(id))
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/edit/:id')
  async editUser(
    @Param('id') id: number,
    @Body() editUser: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.edit(Number(id), editUser)
  }
}
