module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './data/lambda.db3' },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './data/seeds' },
  },
}
//   development: {
//     client: 'pg',
//     connection:'postgres://localhost/secondpsql',
//     migrations: {
//       directory: './data/migrations'
//     },
//     seeds: {
//       directory: './data/seeds'
//     },
//     useNullAsDefault: true
//   },

//   test: {
//     client: 'pg',
//     connection:'postgres://localhost/secondpsql_test',
//     migrations: {
//       directory: './data/migrations'
//     },
//     seeds: {
//       directory: './data/seeds'
//     },
//     useNullAsDefault: true
//   },

//   production: {
//     client: 'pg',
//     connection: process.env.DATABASE_URL,
//     migrations: {
//       directory: './data/migrations'
//     },
//     seeds: {
//       directory: './data/seeds'
//     },
//     useNullAsDefault: true
// },
// }
