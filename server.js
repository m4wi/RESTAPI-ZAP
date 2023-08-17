import express from 'express'
import morgan from 'morgan'
import postgres from 'postgres'
import dotenv from 'dotenv'


const app = express()
dotenv.config({path : './.env'})


const sql = postgres(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`
    )

app.use(morgan())

app.get('/', (req, res) => {
    res.send('Server Online ...')
})

/*
async function getSuppliers () {
    const suppliers = await sql`SELECT * FROM suppliers`
    return suppliers
}
*/

app.get('/supplier',async (req, res) => {
    const query = await sql`SELECT * FROM suppliers`
    res.json(query)
})


// Routes
app.listen(3000)