import { Module } from '@nestjs/common';
import { RestituicaoService } from './restituicao.service';
import { RestituicaoController } from './restituicao.controller';

@Module({
  controllers: [RestituicaoController],
  providers: [RestituicaoService]
})
export class RestituicaoModule {}
