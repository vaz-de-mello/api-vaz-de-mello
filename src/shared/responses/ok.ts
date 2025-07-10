interface OkResponseDto {
    message?: string;
    data?: any;
}

export class Ok {
    success: boolean;
    message: string;
    data?: any;

    constructor({
        data,
        message,
    }: OkResponseDto) {
        this.success = true;
        this.message = message || 'OK';
        data && (this.data = data);
    }
}