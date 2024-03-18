import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    name: "localhost",
    user: "root",
    password: "eb6vKthR6144!",
    database: "test"
})

app.use(express.json())

app.use(cors())

app.get("/", (req,res) => {
    res.json("hello this is the backend!")
})

app.post("/books", (req,res) => {
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES(?)"
    const vals = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]
    db.query(q, [vals], (err, data) => {
        if(err) return res.json(err)
        return res.json("book has been created successfully")
    })
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("book has been deleted successfully")
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = "UPDATE `test`.`books` SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE (`id` = ?)";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
        
    ]

    db.query(q, [...values, bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("book has been updated successfully")
    })
})

app.listen(8800, () => {console.log("connected to the backend!")})