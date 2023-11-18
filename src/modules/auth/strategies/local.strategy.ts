import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthService } from "../auth.service";
import { EnvKeys } from "src/config/configuration";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string) {
    if (password === this.configService.getOrThrow(EnvKeys.TABLET_PASSWORD)) {
      // Validate tablet
      const tablet = await this.authService.validateTablet(email);
      if (!tablet) {
        throw new UnauthorizedException();
      }
      return { success: true };
    }
    const user = await this.authService.validate(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.verifiedAt) {
      throw new BadRequestException("Account not verified");
    }
    return user;
  }
}
