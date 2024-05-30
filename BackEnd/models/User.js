import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  number: String,
  email: String,
  role : String,
  cart :  {
    type: [{productId : String, count:Number}],
    required: true,
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
  location: {
    type: { type: String, enum: ['Point']},
    coordinates: { type: [Number] }
  },
  password: String,
},
{ timestamps: true });
userSchema.index({ location: '2dsphere' });
const User = mongoose.model('User', userSchema);
User.createIndexes(); 

export default User;
