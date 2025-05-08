import { Controller, Get, Post, Body, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Cart } from '@prisma/client';
import { CreateCartDto } from '../dtos/create-cart.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiBearerAuth()
@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new cart' })
  @ApiResponse({ status: 201, description: 'The cart has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    return this.cartService.create(createCartDto.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  @ApiOperation({ summary: 'Get cart by user ID' })
  @ApiResponse({ status: 200, description: 'Return the cart for the specified user.' })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  async findByUser(@Param('userId') userId: string): Promise<Cart> {
    return this.cartService.findByUser(+userId);
  }
}
