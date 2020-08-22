module.exports = {
  'development': {
    'username': process.env.DATABASE_USER,
    'password': process.env.DATABASE_PASSWORD,
    'database': process.env.DATABASE_INSTANCE,
    'host': process.env.DATABASE_HOST,
    'dialect': 'mysql',
  },
};
