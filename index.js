import express from "express"
import mysql from "mysql2"
import cors from "cors";

const app = express()
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host:"srv-db-plesk10.ps.kz:3306",
    user: "ahcvporg_cardiology_root",
    password: "ahcvporg_cardiology_admin",
    database:"ahcvporg_cardiology"
})


app.get("/api", (req, res) => {
    res.json("hello")
})

app.get("/api/news_items", (req, res) => {
    const q =  "SELECT * FROM news_items"
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err)
        }

        return res.json(data)
    })
})

app.get("/api/news_items/:id", (req, res) => {
    const newsId = req.params.id;
    const q =  "SELECT * FROM news_items WHERE id = ?";
    db.query(q, [newsId], (err, data) => {
        if(err) {
            return res.json(err)
        }
        return res.json(data)
    })
})


app.post("/api/ask_items", (req, res) => {
    const q = "INSERT INTO ask_items (`name`, `email`, `content`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email,
        req.body.content
    ]

    db.query(q, [values], (err, data) => {
        if(err) {
            return res.json(err)
        }

        return res.json(data)
    })
})

app.post("/api/membership_items", (req, res) => {
    const q = "INSERT INTO membership_items (`last_name`, `first_name`, `patro_name`,`email`, `phone_number`, `date_birth`, `place_birth`, `address`, `id_doc`, `date_doc`, `place_doc`, `education`, `add_education`, `interests`, `experience`, `date_member` , `terms`) VALUES (?)"
    const values = [
        req.body.last_name,
        req.body.first_name,
        req.body.patro_name, 
        req.body.email,
        req.body.phone_number,
        req.body.date_birth,
        req.body.place_birth,
        req.body.address,
        req.body.id_doc,
        req.body.date_doc,
        req.body.place_doc,
        req.body.education,
        req.body.add_education,
        req.body.interests,
        req.body.experience,
        req.body.date_member,
        req.body.terms
    ]

    db.query(q, [values], (err, data) => {
        if(err) {
            return res.json(err)
        }

        return res.json(data)
    })
})

app.post("/api/education_items", (req, res) => {
    const q = "INSERT INTO education_items (`last_name`, `first_name`, `patro_name`,`email`, `phone_number`, `speciality`, `address_home`, `address_work`, `picked_month`, `picked_time`, `terms`) VALUES (?)"
    const values = [
        req.body.last_name,
        req.body.first_name,
        req.body.patro_name, 
        req.body.email,
        req.body.phone_number,
        req.body.speciality,
        req.body.address_home,
        req.body.address_work,
        req.body.picked_month,
        req.body.picked_time,
        req.body.terms
    ]

    db.query(q, [values], (err, data) => {
        if(err) {
            return res.json(err)
        }

        return res.json(data)
    })
})

app.listen(8800, () => {
    console.log('connected to backend')
})