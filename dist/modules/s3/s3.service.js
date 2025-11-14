"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const common_1 = require("@nestjs/common");
let S3Service = class S3Service {
    constructor() {
        this.s3 = new client_s3_1.S3Client({
            region: 'us-east-1',
            credentials: {
                accessKeyId: process.env.S3_KEY,
                secretAccessKey: process.env.S3_SECRET_KEY,
            },
        });
    }
    async generatePresignedUrl(fileName, fileType) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: fileName,
            ContentType: fileType,
        });
        return (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 60 });
    }
    async getDownloadUrl(fileName) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: fileName,
        });
        return (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 60 });
    }
    async getDeleteUrl(fileName) {
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: fileName,
        });
        return (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 60 });
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)()
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map