var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'acomocha@gmail.com',
      pass: 'sorlfdmf!Rkwk1'
    }
});
  
function sendMail(target, subject, text) {
    console.log(" Text : "  + text);
    
    var mailOptions = {
        from: 'acomocha@gmail.com',
        to: target,
        subject: subject,
        text: text
    };
    return new Promise(function(resolve, reject) {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                reject(Error(error));
            } else {
                resolve(info.response);
            }
        });   
    })
}

exports.sendMail = sendMail;
