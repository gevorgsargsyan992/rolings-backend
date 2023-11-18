import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { UserModule } from "../user/user.module";
import { JwtConfigs } from "../../config/jwt";
import { TabletModule } from "../tablet/tablet.module";

@Module({
  imports: [
    UserModule,
    TabletModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register(JwtConfigs),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
