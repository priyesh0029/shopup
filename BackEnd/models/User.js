import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  number: String,
  email: String,
  role : String,
  location: Object,
  password: String,
},
{ timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
