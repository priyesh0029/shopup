import mongoose from 'mongoose';

const shopOwnerSchema = new mongoose.Schema({
  name: String,
  username: String,
  number: String,
  email: String,
  role : String,
  address:String,
  location : Object,
  password: String,
},
{ timestamps: true });

const ShopOwner = mongoose.model('ShopOwner', shopOwnerSchema);

export default ShopOwner;