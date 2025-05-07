import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Cart } from '@prisma/client';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cart' })
  @ApiResponse({ status: 201, description: 'The cart has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createCartDto: number): Promise<Cart> {
    return this.cartService.create(createCartDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get cart by user ID' })
  @ApiResponse({ status: 200, description: 'Return the cart for the specified user.' })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  async findByUser(@Param('userId') userId: string): Promise<Cart> {
    return this.cartService.findByUser(+userId);
  }
}
