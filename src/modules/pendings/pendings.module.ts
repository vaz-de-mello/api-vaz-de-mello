import { Module } from '@nestjs/common';
import { PendingsService } from './pendings.service';
import { PendingsController } from './pendings.controller';

@Module({
  controllers: [PendingsController],
  providers: [PendingsService]
})
export class PendingsModule {}
