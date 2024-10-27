import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URL)

const connectDB = mongoose.connection

connectDB.on('error', console.error.bind(console, 'connection error:'))
connectDB.once('open', () => {
    console.log('Connected to MongoDB')
})

export default connectDB
