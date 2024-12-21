import {
  Body,
  Controller,
  // DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  // ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AddProductDto } from './dtos/addProduct.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { MongoIdDto } from 'src/common/mongoid.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(
    // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query() paginationDto: PaginationDto,
  ) {
    console.log(paginationDto);
    try {
      return await this.productService.getProducts();
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getProductDetails(@Param() mongoIdDto: MongoIdDto) {
    const productId = mongoIdDto.id;
    try {
      return await this.productService.getProductById(productId);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createProduct(@Body() addProductDto: AddProductDto) {
    try {
      return await this.productService.addProduct(addProductDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
