import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";

@Injectable()
export class S3Service {
    private s3 = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.S3_KEY!,
            secretAccessKey: process.env.S3_SECRET_KEY!,
        },
    });

    async generatePresignedUrl(fileName: string, fileType: string) {
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: fileName,
            ContentType: fileType,
        });

        return getSignedUrl(this.s3, command, { expiresIn: 600 });
    }

    async getDownloadUrl(fileName: string) {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: fileName,
        });

        return getSignedUrl(this.s3, command, { expiresIn: 600 });
    }
}
