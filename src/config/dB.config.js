import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://joey2596:6Gsb0szOnn5mCODC@cluster0.lsakre9.mongodb.net/backEndII?retryWrites=true&w=majority&appName=Cluster0')

const connectDB = mongoose.connection

connectDB.on('error', console.error.bind(console, 'connection error:'))
connectDB.once('open', () => {
    console.log('Connected to MongoDB')
})

export default connectDB
