import {} from 'class-validator';
import { IsMongoIdObject } from 'src/common/mongo.validation';
export class GetProductParamDto {
  @IsMongoIdObject()
  id: string;
}
