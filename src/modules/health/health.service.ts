import { Injectable } from '@nestjs/common';
import { Ok } from 'src/shared/responses';

@Injectable()
export class HealthService {
    health() {
        return new Ok({
            data: { version: '1.0.0' },
            message: 'API rodando!'
        })
    }
}
