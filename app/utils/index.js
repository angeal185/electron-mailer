const config = require('../config/config'),
fs = require('fs'),
_ = require('lodash'),
nodemailer = require('nodemailer'),
mailerOps = require('../config/nodemailer'),

exports.sendEmail = function (){
  var portNo;
  var sendTo;
  if (mailerOps.secure){
    portNo = mailerOps.port.secure
  } else {
    portNo = mailerOps.port.insecure
  }

  if (mailerOps.useSubscribers){
    sendTo = _.toString(mailerOps.subscribersList);
  } else {
    sendTo = '';
  }


  let transporter = nodemailer.createTransport({
      host: mailerOps.host, //['mail.yahoo.com', 'smtp.gmail.com']
      port: portNo,
      secure: mailerOps.secure,
      auth: {
          user: mailerOps.auth.user,
          pass: mailerOps.auth.pass
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: mailerOps.from,
      to: sendTo,
      subject: 'multiTest',
      text: 'secure working?',
      html: '<b>Hello world?</b>',
      attachments: [
        {
            filename: 'test.txt',
            path: './test.txt',
            cid: 'beneaves01@hotmail.com' // should be as unique as possible
        }
    ]
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
}

//sendEmail()
