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
