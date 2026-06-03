import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateScriptController } from './controllers/create-script.controller';
import { CreateScriptUseCase } from 'src/domain/scripts/application/use-cases/create-script';
import { DeleteScriptController } from './controllers/desactive-script.controller';
import { ExecuteScriptController } from './controllers/execute-script.controller';
import { DeleteScriptUseCase } from 'src/domain/scripts/application/use-cases/delete-use-case';
import { ExecuteScriptUseCase } from 'src/domain/execution/application/use-cases/execute-script-use-case';
import { ShellModule } from './shell/shell.module';
import { FetchScriptsController } from './controllers/get-script.controller';
import { GetScriptController } from './controllers/get-script-by-id.controller';
import { EditScriptController } from './controllers/update-script.controller';
import { FetchScriptsUseCase } from 'src/domain/scripts/application/use-cases/find-many-use-case';
import { GetScriptUseCase } from 'src/domain/scripts/application/use-cases/get-by-id-use-case';
import { EditScriptUseCase } from 'src/domain/scripts/application/use-cases/update-use-case';

@Module({
  imports: [
    DatabaseModule,
    ShellModule
  ],
  controllers:[
    CreateScriptController,
    DeleteScriptController,
    FetchScriptsController,
    GetScriptController,
    EditScriptController,
    ExecuteScriptController,

  ],
  providers: [
    CreateScriptUseCase,
    DeleteScriptUseCase,
    FetchScriptsUseCase,
    GetScriptUseCase,
    EditScriptUseCase,
    ExecuteScriptUseCase,
  ]

})

export class HttpModule { }
