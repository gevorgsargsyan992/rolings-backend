import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UserService } from "../../user/user.service";
import { TabletService } from "../../tablet/tablet.service";
import { LoginTypes } from "src/helpers/login-types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly tabletService: TabletService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(validationPayload: { email: string; sub: string; type: string }) {
    switch (validationPayload?.type) {
      case LoginTypes.USER:
        return this.userService.getUserByEmail(validationPayload.email);
      case LoginTypes.TABLET:
        return this.tabletService.getTablet(validationPayload.email);
      default:
        return null;
    }
  }
}
