import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "db/data-source";
import { configValidationSchema } from "./config/configuration";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { VerificationModule } from "./modules/verification/verification.module";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerOptions } from "./config/throttler.config";
import { RestorePasswordModule } from "./modules/restore-password/restore-password.module";
import { TabletModule } from "./modules/tablet/tablet.module";
import { VideoModule } from "./modules/video/video.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { mailerConfig } from "./config/mailer.config";
import { VehicleModule } from "./modules/vehicle/vehicle.module";
import { MonitoringModule } from "./modules/monitoring/monitoring.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      useClass: ThrottlerOptions,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    VerificationModule,
    RestorePasswordModule,
    TabletModule,
    VideoModule,
    VehicleModule,
    MonitoringModule,
    MailerModule.forRoot(mailerConfig),
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
