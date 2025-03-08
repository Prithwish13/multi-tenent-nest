import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class TenantConnectionService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  getTenantConnection(tenantId: string): Connection {
    const tenantConnection = this.connection.useDb(tenantId);
    return tenantConnection;
  }

  async getTenantModel({ name, schema }, tenantId: string) {
    const tenantConnection = this.getTenantConnection(tenantId);
    return tenantConnection.model(name, schema);
  }
}
