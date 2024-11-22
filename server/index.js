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
app.use(express.json({ limit: "5MB"}))

app.post('/signup', async (req, res) => {
    let { body } = req, { email, password } = body

    try {
        email = email.toLowerCase()
        const data = await User.findOne({ email })

        if (data) {
            return res.status(400).json({ message: 'user already exist' })
        }
        password = await hash(password, 10)
        const user = await new User({ ...body, email }).save()
        const token = await createToken({ email, user: user._id })
        return res.status(201).json({ login: true, token })
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

    const { limit, skip } = req.body
    const data = await Books.aggregate([
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
})


app.post('/user/logout', (req, res)=>{
   return res.status(200).json({ logout: true })
})

app.post('/user/book', async (req, res) => {
    const token = req.headers.authorization
    const { user } = await verifyToken(token),
        { id, ...body } = req.body

    try {
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
        const { limit, skip } = req.body

        const data = await Books.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(user) } },

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