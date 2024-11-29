require('dotenv').config()
require('./db')

const express = require('express')
const cors = require('cors')
const User = require('./Schema/User')
const { hash, compare } = require('bcrypt')
const { createToken, verifyToken } = require('./lib/token')
const Books = require('./Schema/Books')
const { default: mongoose } = require('mongoose')

const PORT = 3001

const app = express()

app.use(cors())
app.use(express.json({ limit: "5MB" }))


app.all('/signup', async (req, res) => {
    let data, { body } = req,
        { email, password, token } = body

    try {

        body.password = await hash(password, 10)

        if (token) {
            const { user } = await verifyToken(token)
            data = await User.findByIdAndUpdate(user, body)
        } else {
            email = email.toLowerCase()
            data = await User.findOne({ email })
            if (data) {
                return res.status(400).json({ message: 'user already exist' })
            }
            data = await new User({ ...body, email }).save()
        }

        const tok = await createToken({ email, user: data._id })
        return res.status(201).json({ login: true, token: tok })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})


app.post('/login', async (req, res) => {
    let { email, password } = req.body

    try {
        email = email.toLowerCase()
        const data = await User.findOne({ email })
        if (!data) {
            return res.status(404).json({ message: 'user not found' })
        }
        const match = await compare(password, data.password)
        if (!match) {
            return res.status(400).json({ message: 'user and password not matched' })
        }
        const token = await createToken({ email: data.email, user: data._id })
        return res.status(201).json({ login: true, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/books', async (req, res) => {

    try {
        const { limit = 24, skip = 0, ...others } = req.body
        const match = {}
        Object.keys(others).forEach(d => {
            match[d] = new RegExp(others[d], 'i')
        })

        const data = await Books.aggregate([
            { $match: match },
            {
                $facet: {
                    metadata: [{ $count: "total" }],
                    data: [
                        {
                            $limit: limit
                        },
                        {
                            $skip: skip
                        },
                        {
                            $sort: { createdAt: -1 }
                        }
                    ],
                },
            },
            {
                $project: {
                    data: "$data",
                    total: { $arrayElemAt: ["$metadata.total", 0] },
                }
            }
        ])

        return res.json(data[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.post('/user/logout', (req, res) => {
    return res.status(200).json({ logout: true })
})

app.get('/user/account', async (req, res) => {
    const token = req.headers.authorization

    try {
        const { user } = await verifyToken(token)
        const data = await User.findById(user)

        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message, href: error.href })

    }
})

app.post('/user/book', async (req, res) => {
    const token = req.headers.authorization

    try {
        const { user } = await verifyToken(token),
            { id, ...body } = req.body

        let data
        if (id == 'new') {
            body.user = user
            body.sno = await Books.countDocuments() + 1
            data = await new Books(body).save()
        } else {
            data = await Books.findOneAndUpdate({ user, _id: id }, body, { new: true })
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message, href: error.href })
    }
})

app.post('/user/books', async (req, res) => {

    try {
        const token = req.headers.authorization
        const { user } = await verifyToken(token)
        const { limit, skip, ...others } = req.body

        const match = { user: new mongoose.Types.ObjectId(user) }
        Object.keys(others).forEach(d => {
            match[d] = new RegExp(others[d], 'i')
        })

        const data = await Books.aggregate([
            { $match: match },
            {
                $facet: {
                    metadata: [{ $count: "total" }],
                    data: [
                        {
                            $limit: limit
                        },
                        {
                            $skip: skip
                        },
                        {
                            $sort: { createdAt: -1 }
                        }
                    ],
                },
            },
            {
                $project: {
                    data: "$data",
                    total: { $arrayElemAt: ["$metadata.total", 0] },
                }
            }])
        return res.status(200).json(data[0])
    } catch (error) {
        return res.status(400).json({ message: error.message, href: error.href })
    }

})


app.get('/user', async (req, res) => {

    try {
        const token = req.headers.authorization
        const { user } = await verifyToken(token)
        const data = await User.findById(user).select("-password")
        return res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

})


app.listen(PORT, () => {
    console.log('Server Started at ' + PORT);
})