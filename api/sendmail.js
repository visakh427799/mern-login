const nodemailer=require("nodemailer");

module.exports = Mailsender=(data)=>{

  var transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'visakhsanthosh69@gmail.com',
        pass:'427799@TVS',
    }

  })

  transport.sendMail(data,((error,info)=>{

       if(error)
       {
           console.log(error)
       }
       else{
           console.log("Mail send"+info.response)
       }
  }))


}