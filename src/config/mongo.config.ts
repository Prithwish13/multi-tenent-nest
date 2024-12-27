import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
export const mongooseModuleAsyncOptions: MongooseModuleAsyncOptions = {
  useFactory: async (config: ConfigService) => {
    const uri = config.get<string>('MONGO_URI');
    return { uri };
  },
  inject: [ConfigService],
};
