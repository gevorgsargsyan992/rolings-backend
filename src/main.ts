import { configureRequestLogging } from './config/request-logger.config';
import { configureSentry } from './config/sentry.config';
import { configureSwagger } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';
import { EnvKeys } from './config/configuration';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const isProduction = process.env[EnvKeys.NODE_ENV] === 'production';
  const loadCustomCertificates =
    process.env[EnvKeys.TLS_ENABLED] === 'true' && isProduction;

  const options: NestApplicationOptions = {
    ...(loadCustomCertificates && {
      httpsOptions: {
        key: readFileSync(join(process.cwd(), 'privkey.pem')),
        cert: readFileSync(join(process.cwd(), 'fullchain.pem')),
      },
    }),
  };

  const app = await NestFactory.create(AppModule, options);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  configureSwagger(app);
  configureSentry(app);
  configureRequestLogging(app);

  const configService = app.get(ConfigService);
  await app.listen(configService.getOrThrow(EnvKeys.APP_PORT));
}
bootstrap();
