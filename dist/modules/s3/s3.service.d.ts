export declare class S3Service {
    private s3;
    generatePresignedUrl(fileName: string, fileType: string): Promise<string>;
    getDownloadUrl(fileName: string): Promise<string>;
    deleteFile(fileName: string): Promise<string>;
}
