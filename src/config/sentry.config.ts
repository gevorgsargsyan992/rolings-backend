import { EnvKeys } from './configuration';
import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
  INestApplication,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((exception) => {
        Sentry.captureException(exception);

        return throwError(() => exception);
      }),
    );
  }
}

export const configureSentry = (app: INestApplication) => {
  const loggerService = new Logger();
  const configService = app.get(ConfigService);
  const dsn = configService.get(EnvKeys.SENTRY_DSN);
  const enableSentry = configService.get(EnvKeys.ENABLE_SENTRY) && !!dsn;

  if (!enableSentry) {
    return;
  }

  loggerService.log('Sentry enabled');

  Sentry.init({
    dsn: configService.getOrThrow(EnvKeys.SENTRY_DSN),
    environment: configService.getOrThrow(EnvKeys.NODE_ENV),
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampler: () => {
      if (configService.getOrThrow(EnvKeys.NODE_ENV) === 'production') {
        return 0.8;
      }

      return 1;
    },
  });

  app.useGlobalInterceptors(new SentryInterceptor());
};
