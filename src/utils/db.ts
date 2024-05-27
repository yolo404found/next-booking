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
  console.log();
  
  try {
    if(mongoose.connections[0].readyState != 1){
      await mongoose.connect(String(process.env.NEXT_PUBLIC_MONGODB_URI), {
      });
      // mongoose.model('Booking', Booking.schema);
      // mongoose.model('Location', Location.schema);
      // mongoose.model('Payment', Payment.schema);
      // mongoose.model('Review', Review.schema);
      // mongoose.model('User', User.schema);
      // mongoose.model('Service', Service.schema);
      // mongoose.model('ServiceProvider', ServiceProvider.schema);
    }
  } catch (error) {
    throw new Error('Database connection failed');
  }
};

export const fetcher = async ({url,id,param={},method=API_METHOD.GET,body}:{url:string,id?:string,param?:Object,method?:API_METHOD,body?:any}) => {
  let routeParam = Object.keys(param)
  return await fetch(`${API.ROOT_URL}${url}/${ id ?? ''}${param[routeParam[0]] ? "?"+ routeParam[0]+"="+param[routeParam[0]] : ''}`,{method:method,headers:{
    'Content-Type':'application/json'
  },body:JSON.stringify(body)}).then(res=>res.json())
}

