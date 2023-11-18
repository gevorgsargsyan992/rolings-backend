import { VerificationDTO } from './dto/verification-response';
import { Body, Controller, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResendVerificationCodeDto } from './dto/resend-verification-code.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { VerificationService } from './verification.service';

@Controller('verification')
@ApiTags('Verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @ApiOperation({
    summary: 'Verify user by code and email',
  })
  @ApiOkResponse({
    type: VerificationDTO,
  })
  @Patch()
  update(@Body() verifyUserDto: VerifyUserDto) {
    return this.verificationService.update(verifyUserDto);
  }

  @ApiOperation({
    summary: 'Resend verification code',
  })
  @Patch('resend')
  resendVerificationCode(
    @Body() resendVerificationCodeDto: ResendVerificationCodeDto,
  ) {
    return this.verificationService.resendVerificationCode(
      resendVerificationCodeDto,
    );
  }
}
