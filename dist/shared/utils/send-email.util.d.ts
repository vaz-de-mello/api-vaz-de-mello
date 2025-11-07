interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
}
export declare function sendEmail(options: SendEmailOptions): Promise<any>;
export {};
