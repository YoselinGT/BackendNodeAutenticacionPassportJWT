import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secureConnection: false,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "yoselin.galvan.torres@gmail.com",
        pass: "fhnb arpk nois drbn",
    },
    tls: {
        ciphers:'SSLv3'
    }
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMain() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "yoselingt097@gmail.com, yoselingt097@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
}

sendMain().catch(console.error);