import dotenv from 'dotenv';
dotenv.config();
import {app,server} from './app.js'
server.listen(process.env.PORT,()=>{
    console.log(`Server is listening at port ${process.env.PORT}`);
})