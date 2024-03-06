import 'dotenv/config'
import pg from 'pg';

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_auth',
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
})

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to PostgreSQL Database:', err);
    } else {
        console.log('Connected to PostgreSQL Database');
    }
});

export default pool;