import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: String,
  email: String,
  role : String,
  password: String,
},
{ timestamps: true });

const admin = mongoose.model('admin', adminSchema);

export default admin;