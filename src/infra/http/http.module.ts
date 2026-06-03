import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateScriptController } from './controllers/create-script.controller';
import { CreateScriptUseCase } from 'src/domain/scripts/application/use-cases/create-script';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers:[
    CreateScriptController 
  ],
  providers: [
    CreateScriptUseCase
  ]

})

export class HttpModule { }
