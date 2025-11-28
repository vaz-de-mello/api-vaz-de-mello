import { Injectable } from '@nestjs/common';
import { Ok } from 'src/shared/responses';

@Injectable()
export class HealthService {
    health() {
        return new Ok({
            data: { version: '1.1.3' },
            message: 'API rodando!'
        })
    }
}
