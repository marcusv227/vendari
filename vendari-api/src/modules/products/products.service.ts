import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany();
  }

  create(dto: CreateProductDto) {
    return this.prisma.product.create({ data: dto });
  }
  
  delete(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
  edit(id: number, dto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }
}
