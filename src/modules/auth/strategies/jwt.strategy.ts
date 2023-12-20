import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

//import { UserService } from "../../user/user.service";
import { TabletService } from "../../tablet/tablet.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    //private readonly userService: UserService,
    private readonly tabletService: TabletService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(validationPayload: { email: string; sub: string }) {
    //TODO: separate tablet and user validation
    return this.tabletService.getTablet(validationPayload.email);
  }
}
