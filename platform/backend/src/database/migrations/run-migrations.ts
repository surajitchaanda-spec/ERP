import AppDataSource from '../data-source';

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.runMigrations();
    await AppDataSource.destroy();
    process.exit(0);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  });
