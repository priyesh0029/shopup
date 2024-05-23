import mongoose from 'mongoose';

const shopOwnerSchema = new mongoose.Schema({
  name: String,
  username: String,
  number: String,
  email: String,
  role : String,
  address:String,
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  password: String,
},
{ timestamps: true });

shopOwnerSchema.index({ location: '2dsphere' });

const ShopOwner = mongoose.model('ShopOwner', shopOwnerSchema);
ShopOwner.createIndexes();

export default ShopOwner;