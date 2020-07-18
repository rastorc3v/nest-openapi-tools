import { NestFactory } from '@nestjs/core';
import { CliModule } from './cli.module';
import { CliService } from './cli.service';
import { InitializeActionService } from './cli-actions/initialize-action.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CliModule, {
    logger: false,
  });

  const cliService = app.get(CliService);
  const args = cliService.parseArgs();

  if (args.action === 'init') {
    await app.get(InitializeActionService).run(args.args);
  }
}
bootstrap();