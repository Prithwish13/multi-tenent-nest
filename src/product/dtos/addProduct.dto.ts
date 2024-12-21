import { IsString, IsNumber, IsNotEmpty, MinLength } from 'class-validator';

export class AddProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString({
    message: 'description must be a string value',
  })
  @IsNotEmpty()
  @MinLength(10, {
    message: 'length must be 10 character long',
  })
  description: string;

  @IsNumber()
  price: number;
}
