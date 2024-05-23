import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  number: String,
  email: String,
  role : String,
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  password: String,
},
{ timestamps: true });
userSchema.index({ location: '2dsphere' });
const User = mongoose.model('User', userSchema);
User.createIndexes(); 

export default User;
