import { UserLoginDto } from './../auth/dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { Controller, Post, Body, Patch } from '@nestjs/common';
import { RestorePasswordService } from './restore-password.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { VerifyUserDto } from '../verification/dto/verify-user.dto';

@Controller('restore-password')
@ApiTags('Restore Password')
export class RestorePasswordController {
  constructor(
    private readonly restorePasswordService: RestorePasswordService,
  ) {}

  @ApiOperation({
    summary: 'Verify email address exists',
    description:
      'This endpoint is used to verify email address exists. If it exists, it will send a code to the email address, otherwise it will throw an error.',
  })
  @Post('verify-email')
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.restorePasswordService.verifyEmail(verifyEmailDto);
  }

  @ApiOperation({
    summary: 'Verify the new code',
  })
  @Patch('verify-code')
  verifyCode(@Body() verifyEmailDto: VerifyUserDto) {
    return this.restorePasswordService.verifyCode(verifyEmailDto);
  }

  @ApiOperation({
    summary: "Change user's password",
  })
  @Patch()
  changePassword(@Body() userLoginDto: UserLoginDto) {
    return this.restorePasswordService.changePassword(userLoginDto);
  }
}
