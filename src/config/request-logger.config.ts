import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';

export const configureRequestLogging = (app: INestApplication) => {
  const logger = new Logger('Request');
  const configService = app.get(ConfigService);
  const isProduction = configService.get('NODE_ENV') === 'production';
  const preset = isProduction ? 'short' : 'dev';

  app.use(
    morgan(preset, {
      stream: {
        write: (message) => logger.log(message.replace('\n', '')),
      },
    }),
  );
};
