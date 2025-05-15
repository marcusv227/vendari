import { Controller, Get, Post, UseGuards, Req, UseInterceptors, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Cart } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { getUserIdFromRawHeaders } from '../shared/domain/jsonwebtoken';

@ApiBearerAuth()
@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create or get cart for authenticated user' })
  async createOrGet(@Req() req): Promise<Cart> {
    const userId = getUserIdFromRawHeaders(req);
    return this.cartService.getOrCreateCart(Number(userId));
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/clear')
  @ApiOperation({ summary: 'Clear all items in the user\'s cart' })
  async clearCart(@Req() req) {
    const userId = getUserIdFromRawHeaders(req);
    return this.cartService.clearCart(Number(userId));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get cart for authenticated user' })
  async get(@Req() req): Promise<Cart> {
    const userId = getUserIdFromRawHeaders(req);
    return this.cartService.findByUser(Number(userId));
  }
}
