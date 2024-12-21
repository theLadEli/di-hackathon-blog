require('dotenv').config();
const postgres = require('postgres');
const {
    PGHOST,
    PGDATABASE,
    PGUSER,
    PGPASSWORD
} = process.env;

const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: 'require',
});

async function getPgVersion() {
    const result = await sql `select version()`;
    console.log(result[0]);
}

getPgVersion();