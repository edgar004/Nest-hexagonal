import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { Scope } from '@nestjs/common';
import { createConnection, getConnectionManager } from 'typeorm';
import { REQUEST } from '@nestjs/core';

export const defaultConnectionFactory = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get('TYPEORM_HOST'),
  port: +config.get('TYPEORM_PORT'),
  username: config.get('TYPEORM_USERNAME'),
  password: config.get('TYPEORM_PASSWORD'),
  database: config.get('TYPEORM_DATABASE'),
  entities: [join(__dirname, '../../../data/entities/**/*.entity{.ts,.js}')],
  synchronize: config.get('TYPEORM_SYNCRONIZE') === 'true',
  logging: config.get('TYPEORM_LOGGING') === 'true',
});

export const tenantConnectionProvider = {
  provide: 'TENANT_CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async (config: ConfigService, req) => {
    const tenantId = req.headers['x-tenant-id'];
    if (tenantId) {
      const connectionManager = getConnectionManager();
      if (connectionManager.has(tenantId)) {
        const conn = connectionManager.get(tenantId);
        return Promise.resolve(conn.isConnected ? conn : conn.connect());
      }

      return createConnection({
        type: 'postgres',
        name: tenantId,
        schema: tenantId,
        host: config.get('TYPEORM_HOST'),
        port: +config.get('TYPEORM_PORT'),
        username: config.get('TYPEORM_USERNAME'),
        password: config.get('TYPEORM_PASSWORD'),
        database: config.get('TYPEORM_DATABASE'),
        entities: [
          join(__dirname, '../../../data/entities/**/*.entity{.ts,.js}'),
        ],
      });
    }
  },
  inject: [ConfigService, REQUEST],
};
