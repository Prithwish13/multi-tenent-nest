export default () => ({
  database: {
    connectionString: process.env.MONGO_URI,
  },
  port: process.env.PORT ?? 5000,
});
