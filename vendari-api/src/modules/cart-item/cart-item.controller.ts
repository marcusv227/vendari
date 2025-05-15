import { Controller, Post, Body, Patch, Delete, Param, Get, UseGuards, Req } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from '../dtos/create-cart-item.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CartItem } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { getUserIdFromRawHeaders } from '../shared/domain/jsonwebtoken';

@ApiBearerAuth()
@ApiTags('Cart Items')
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Add or update item in cart' })
  async createOrUpdate(@Req() req, @Body() dto: CreateCartItemDto): Promise<CartItem> {
    const userId = getUserIdFromRawHeaders(req);
    return this.cartItemService.createOrUpdate(Number(userId), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete a cart item by ID' })
  @ApiResponse({ status: 200, description: 'The cart item has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  async deleteCartItem(@Param('id') id: number) {
    return this.cartItemService.remove(Number(id));
  }

  @UseGuards(JwtAuthGuard)
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
