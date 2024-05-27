import mongoose from 'mongoose';
import { API_METHOD } from '../config/general';
import { API } from '../config/apiEndpoint';
import Service from '../models/Service';
import ServiceProvider from '../models/ServiceProvider';
import Booking from '../models/Booking';
import Payment from '../models/Payment';
import Review from '../models/Review';
import User from '../models/User';
import Location from '../models/Location';

export const connectDB = async () => {
  try {
    if(true){
      await mongoose.connect(String(process.env.NEXT_PUBLIC_MONGODB_URI), {
      });
      mongoose.model('Booking', Booking.schema);
      mongoose.model('Location', Location.schema);
      mongoose.model('Payment', Payment.schema);
      mongoose.model('Review', Review.schema);
      mongoose.model('User', User.schema);
      mongoose.model('Service', Service.schema);
      mongoose.model('ServiceProvider', ServiceProvider.schema);
    }
  } catch (error) {
    throw new Error('Database connection failed');
  }
};

export const fetcher = async ({url,id,method=API_METHOD.GET,body}:{url:string,id?:string,method?:API_METHOD,body?:any}) => {
  return await fetch(`${API.ROOT_URL}${url}/${ id ?? ''}`,{method:method,headers:{
    'Content-Type':'application/json'
  },body:JSON.stringify(body)}).then(res=>res.json())
}

