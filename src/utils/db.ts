import mongoose from 'mongoose';
import { API_METHOD } from '../config/general';
import { API } from '../config/apiEndpoint';
require('../models/Service');
require('../models/ServiceProvider');
require('../models/Booking');
require('../models/Payment');
require('../models/Review');
require('../models/User');
require('../models/Location');

export const connectDB = async () => {
  try {
      await mongoose.connect('mongodb://localhost:27017/bookingSystem', {
        useNewUrlParser: true, useUnifiedTopology: true
      } as mongoose.ConnectOptions);
      console.log('Datebase connection success');
  } catch (error) {
    throw new Error('Database connection failed');
  }
};

export const fetcher = async ({url,id,param={},method=API_METHOD.GET,body}:{url:string,id?:string,param?:Object,method?:API_METHOD,body?:any}) => {
  let routeParam = Object.keys(param)
  return await fetch(`${API.ROOT_URL}${url}/${ id ?? ''}${param[routeParam[0]] ? "?"+ routeParam[0]+"="+param[routeParam[0]] : ''}`,{method:method,headers:{
    'Content-Type':'application/json'
  },body:JSON.stringify(body)}).then(res=>res.json()).catch(err=>console.error(err))
}

