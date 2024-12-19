import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Tenant } from './tenant.schema';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  async getTenants() {
    try {
      return await this.tenantService.getTenantBydId('ABC');
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post()
  async createTenant(@Body() tenant: Tenant) {
    try {
      return await this.tenantService.createTenantById(tenant);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
