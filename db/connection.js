const mongoose=require('mongoose')
const connectionString=process.env.MONGO_URL

mongoose.connect(connectionString,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('Mongodb Atlas connected successfully');
}).catch((error)=>{
    console.log(`Atlas connection error ${error}`);
})