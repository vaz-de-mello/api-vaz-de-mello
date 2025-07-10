import * as nodemailer from 'nodemailer';

interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'gfmelchert@gmail.com',
        pass: 'ukah izdf mkvg ehyv',
    },
});

export async function sendEmail(options: SendEmailOptions) {
    return transporter.sendMail({
        from: 'Aplicativo <contato@vazdemelloneto.com.br>',
        ...options,
    });
}