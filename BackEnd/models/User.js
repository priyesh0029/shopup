import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  number: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

export default User;
