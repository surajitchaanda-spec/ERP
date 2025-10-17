export default () => ({
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER || 'erp',
    password: process.env.DB_PASSWORD || 'erp',
    name: process.env.DB_NAME || 'erp',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'change-me',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  multiTenant: {
    headerKey: process.env.TENANT_HEADER_KEY || 'x-tenant-id',
    defaultTenantId: process.env.DEFAULT_TENANT_ID || '00000000-0000-0000-0000-000000000001',
  },
});
