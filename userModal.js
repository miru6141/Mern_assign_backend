import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  // other fields...
});

export  default mongoose.model('user', userSchema);
