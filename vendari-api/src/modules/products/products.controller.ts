import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { UpdateProductDto } from '../dtos/update-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async deleteProduct(@Param('id') id: number){
    return this.productsService.delete(Number(id));
  }

  @Patch('/edit/:id')
  @ApiOperation({ summary: 'Edit a product by ID' })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async editProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.edit(Number(id), updateProductDto);
  }
}
