import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateScriptController } from './controllers/create-script.controller';
import { CreateScriptUseCase } from 'src/domain/scripts/application/use-cases/create-script';
import { DeleteScriptController } from './controllers/desactive-script.controller';
import { ExecuteScriptController } from './controllers/execute-script.controller';
import { DeleteScriptUseCase } from 'src/domain/scripts/application/use-cases/delete-use-case';
import { ExecuteScriptUseCase } from 'src/domain/execution/application/use-cases/execute-script-use-case';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers:[
    CreateScriptController ,
    DeleteScriptController,
    ExecuteScriptController,

  ],
  providers: [
    CreateScriptUseCase,
    DeleteScriptUseCase,
    ExecuteScriptUseCase,
  ]

})

export class HttpModule { }
