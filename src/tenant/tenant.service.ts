import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tenant } from './tenant.schema';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name) private TenantModel: Model<Tenant>,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async getTenantBydId(tenant_id: string): Promise<Tenant> {
    const tenant = await this.TenantModel.findOne({
      tenant_id: tenant_id,
    }).exec();
    return tenant;
  }

  async createTenantById(tenant: Tenant): Promise<Tenant> {
    return await this.TenantModel.create({ ...tenant });
  }

  async getAllTenants(): Promise<Tenant[]> {
    const tenants = await this.TenantModel.find().exec();
    return tenants;
  }
}
