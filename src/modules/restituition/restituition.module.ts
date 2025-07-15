import { Module } from '@nestjs/common';
import { RestitutionService } from './restituition.service';
import { RestitutionController } from './restituition.controller';

@Module({
  controllers: [RestitutionController],
  providers: [RestitutionService]
})
export class RestituitionModule { }
