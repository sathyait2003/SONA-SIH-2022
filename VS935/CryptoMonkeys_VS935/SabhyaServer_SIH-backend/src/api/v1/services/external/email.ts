import nodemailer from 'nodemailer';

class MailService {
    constructor() {}
    async sendMail(fromData: any, toData: any) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'youremail@gmail.com',
                pass: 'yourpassword'
            }
        });

        var mailOptions = {
            from: fromData.mail,
            to: toData.mail,
            subject: fromData.subject,
            text: fromData.text
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

export default MailService;
