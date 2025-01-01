import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Tenant } from 'src/tenant/tenant.schema';

export type MessageDocument = HydratedDocument<User>;

@Schema({ collection: 'users', versionKey: false, timestamps: true })
export class User {
  readonly _id: Types.ObjectId;

  @Prop({ trim: true, maxlength: 200 })
  name?: string;

  @Prop({ unique: true, required: true, trim: true, select: false })
  email: string;

  @Prop({
    select: false,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 100,
  })
  password?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Tenant.name })
  _tenant: Tenant;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ _id: 1, status: 1 });
UserSchema.index({ email: 1, status: 1 });
