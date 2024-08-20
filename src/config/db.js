const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://poloit:ir3m4PLNnGk8zMB4@cluster0.zbamoe4.mongodb.net/poloIt', {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
