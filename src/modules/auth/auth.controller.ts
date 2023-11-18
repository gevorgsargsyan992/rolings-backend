import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "../auth/dto/user-login.dto";
import { LocalAuthGuard } from "../../guards/local-auth.guard";
import { TabletLoginDto } from "./dto/tablet-login.dto";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: "Log in with a username and password",
  })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @ApiOperation({
    summary: "Get auth token for tablet",
  })
  @UseGuards(LocalAuthGuard)
  @Post("tablet-login")
  tabletLogin(@Body() tabletLoginDto: TabletLoginDto) {
    return this.authService.tabletLogin(tabletLoginDto);
  }
}
