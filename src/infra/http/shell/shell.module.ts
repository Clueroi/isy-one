import { Module } from '@nestjs/common'
import { ShellExecutor } from 'src/domain/shell/application/use-cases/shell-executor';
import { SpawnShellExecutor } from './spawn-shell.executor';


@Module({
  providers: [
    {
      provide: ShellExecutor,
      useClass: SpawnShellExecutor,
    },
  ],
  exports: [
    ShellExecutor,
  ],
})
export class ShellModule {}