require('dotenv').config();
const {
    PGHOST,
    PGDATABASE,
    PGUSER,
    PGPASSWORD
} = process.env;

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: PGHOST,
        port: 5432,
        user: PGUSER,
        password: PGPASSWORD,
        database: PGDATABASE,
        ssl: { rejectUnauthorized: false },
    },
});

async function viewBlogTable() {
    try {
        const blogs = await knex.select('*').from('posts');
        console.log(blogs);
    } catch (error) {
        console.error('Error fetching blog table:', error);
    } finally {
        knex.destroy();
    }
}

viewBlogTable();