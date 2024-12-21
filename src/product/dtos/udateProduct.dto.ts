import { PartialType } from '@nestjs/swagger';
import { AddProductDto } from './addProduct.dto';

export class UpdateProductDto extends PartialType(AddProductDto) {}
