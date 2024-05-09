import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { EnvKeys } from "../../config/configuration";
import { UserService } from "../user/user.service";
import { UserLoginDto } from "./dto/user-login.dto";
import { TabletLoginDto } from "./dto/tablet-login.dto";
import { TabletService } from "../tablet/tablet.service";
import { LoginTypes } from "../../helpers/login-types";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tabletService: TabletService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  async validate(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return null;
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      return null;
    }
  }
  async validateTablet(email: string) {
    const tablet = await this.tabletService.validate(email);
    if (!tablet) {
      return null;
    }
    return tablet;
  }

  async login(
    userLoginDto: UserLoginDto
  ): Promise<{ access_token: string; id: number }> {
    const payload = {
      email: userLoginDto.email,
      sub: Date.now().toString(),
      type: LoginTypes.USER,
    };
    let expiresIn = this.configService.getOrThrow(EnvKeys.JWT_DEFAULT_EXPIRES); // default 1 hours for the token
    if (userLoginDto.remember) {
      expiresIn = this.configService.getOrThrow(EnvKeys.JWT_LONG_EXPIRES); // set 1 day if the user want to remember session
    }

    const user = await this.userService.getUserByEmail(userLoginDto.email);
    if (!user) {
      throw new BadRequestException("User not found");
    }
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.getOrThrow(EnvKeys.JWT_SECRET),
        expiresIn,
      }),
      id: user.id,
    };
  }

  async tabletLogin(tabletLoginDto: TabletLoginDto) {
    const payload = {
      email: tabletLoginDto.email,
      sub: Date.now().toString(),
      type: LoginTypes.TABLET,
    };
    const tablet = await this.tabletService.getTablet(tabletLoginDto.email);

    return {
      tabletId: tablet.id,
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.getOrThrow(EnvKeys.JWT_SECRET),
        expiresIn: this.configService.getOrThrow(
          EnvKeys.TABLET_JWT_LONG_EXPIRES
        ),
      }),
    };
  }

  async verify(token: string) {
    const decoded = this.jwtService.verify(token, {
      secret: this.configService.getOrThrow(EnvKeys.JWT_SECRET),
    });
    const user = this.userService.getUserByEmail(decoded.email);
    return user;
  }
}
