import { Controller, Post, Body, Patch, Delete, Param, Get } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from '../dtos/create-cart-item.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartItem } from '@prisma/client';

@ApiTags('Cart Items')
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cart item' })
  @ApiResponse({ status: 201, description: 'The cart item has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() dto: CreateCartItemDto): Promise<CartItem> {
    return this.cartItemService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({ status: 200, description: 'Return all cart items.' })
  async findAll(): Promise<CartItem[]> {
    return this.cartItemService.findAll();
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete a cart item by ID' })
  @ApiResponse({ status: 200, description: 'The cart item has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  async deleteCartItem(@Param('id') id: number) {
    return this.cartItemService.remove(Number(id));
  }

  @Patch('/edit/:id')
  @ApiOperation({ summary: 'Edit a cart item by ID' })
  @ApiResponse({ status: 200, description: 'The cart item has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  async editCartItem(
    @Param('id') id: number,
    @Body() dto: UpdateCartItemDto,
  ): Promise<CartItem> {
    return this.cartItemService.update(Number(id), dto);
  }
}
