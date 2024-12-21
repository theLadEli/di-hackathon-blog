const cors = require ('cors');
const express = require('express');
const app = express();
const postgres = require('postgres');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname+'/public'))

const port = 3005;

app.listen(port, () => {
    console.log(`Run on port ${port}`)
})

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
        // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    },
});

async function viewBlogTable() {
    try {
        console.log('Fetching blog table...');
        const blogs = await knex.select('*').from('posts');
        // console.log('Blogs fetched:', blogs);
        return blogs;
    } catch (error) {
        console.error('Error fetching blog table:', error);
        throw error
    }
}

viewBlogTable();

// async function insertValueToDb() {
//     try {
//         const insertValue = await knex('posts').insert({
//             title: 'from vs code',
//             publish_date: '2024-12-21',
//             content: 'This was inserted through vs code',
//             author: 'Eli from VS Code'
//         })
//     } catch (error) {
//         console.error('Error inserting value to the blog table:', error);
//     } finally {
//         knex.destroy();
//     }
// }

// insertValueToDb()


app.get('/post-data', async (req, res) => {
    try {
        const blogPosts = await viewBlogTable(); // Wait for the database query to complete
        res.json(blogPosts); // Send the fetched data as a JSON response
    } catch (error) {
        console.error('Error in /post-data route:', error);
        res.status(500).json({ error: 'Failed to fetch blog table' });
    }
});