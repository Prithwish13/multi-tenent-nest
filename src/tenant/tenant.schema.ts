import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Tenant extends Document {
  @Prop({ required: true })
  tenant_id: string;

  @Prop({ required: true })
  tenant_name: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
