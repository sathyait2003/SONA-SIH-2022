import nodemailer from 'nodemailer';
import otpGen from 'otp-generator';
import EmailService from './email';
var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp.toString());

const emailService = new EmailService();
class OtpService {
    constructor() {}
    async sendOtp(fromData: any, toData: any) {
        let modiFromData = {
            ...fromData,
            text: `thi otp is ${otp}`
        };
        await emailService.sendMail(modiFromData, toData);
    }
    async verifyOtp(otpIs: number) {
        if (otpIs == otp) {
            return true;
        }
        return false;
    }
}

export default OtpService;
