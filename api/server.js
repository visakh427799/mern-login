const express=require("express");
const app    =express();
const cors=require("cors");
const port=8000||process.env.port;
const bodyParser = require('body-parser')
const mongoose=require('mongoose')
let Registerschema =require('./registerschema');
let Mailsend=require('./sendmail');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
 


/*Here is the mongodb coonection here we are connecting our mongodb atlas with express server by specifying 
a connection string (uri) */
const uri = "mongodb+srv://visakhts:427799@cluster0.70uir.mongodb.net/<Login>?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))


app.get('/',(req,res)=>{
    res.send("Hiiii");
})

app.post('/login',(req,res)=>{

   //console.log(req.body);

   Registerschema.findOne({ email: req.body.email,password: req.body.password})
   .then(user => {
          console.log("User from login", user)
          var s=!user;
        console.log(s);
       if (!s)
       {
           res.status(200).send("1");
           //console.log("no account exist")
         
       }
       else {
            res.send("0")
           //console.log("login success") 
          
       }
   }).catch((err)=>{
       console.log("Errror")
   })

})



app.post('/reg',(req,res)=>{
    //console.log(req.body);
    let Register=new Registerschema(req.body);
    Registerschema.findOne({ email: req.body.email })
        .then(user => {
            //console.log(user)
            if (!user)
            {
                
                Register.save().then(reg => {
                    res.send("1");
//storing some datas inside  variable mailOption that contain mail id's and subject to be mailed
                    var mailOptions={
                        from:'visakhsanthosh69@gmail.com',
                        to:req.body.email,
                        subject:'From Express App',
                        text:'Hello'+" "+req.body.name+" "+'You have successfully registered with our app',
                        
                      }
//sending mail by calling a function Mailsend that alreday defined in another file named sendmail.js and passing mailOption
                Mailsend(mailOptions);

                })
                .catch(err => {
                    res.send("0");
                    console.log(err)
                }); 
                        }
            else if(user){
               
                res.send("Email already exist")
            }
        }).catch((err)=>{
            console.log("Errror")
        })

   
})

/*if(process.env.NODE_ENV==='production'){
  
}*/


app.listen(port,()=>{
    console.log("Server starting at 8000");
})