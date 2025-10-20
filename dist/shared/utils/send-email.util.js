"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'gfmelchert@gmail.com',
        pass: 'ukah izdf mkvg ehyv',
    },
});
async function sendEmail(options) {
    return transporter.sendMail(Object.assign({ from: 'Aplicativo <contato@vazdemelloneto.com.br>' }, options));
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=send-email.util.js.map