import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

import { randomCode } from '../../utils/random-code';
import { sendGrid } from '../../helpers/sendGrid';
import { getEncryptedPassword } from './../../helpers/get-encrypted-password';
import { EmailSystemService } from '../email/email.service';
import { User } from '../user/entities/user.entity';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from '../auth/dto/user-login.dto';
import { VerifyUserDto } from '../verification/dto/verify-user.dto';

@Injectable()
export class RestorePasswordService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly emailSystemService: EmailSystemService,
  ) {}

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const existingOrg = await this.userRepository.findOne({
      where: { email: verifyEmailDto.email },
    });

    if (!existingOrg) {
      throw new BadRequestException('Something went wrong');
    }

    const verificationCode = randomCode();

    await this.userRepository.update(
      { id: existingOrg.id },
      {
        verificationCode,
      },
    );

    const dynamicTemplateData = {
      code: verificationCode,
    };

    await this.emailSystemService.create({
      email: verifyEmailDto.email,
      subject: sendGrid.template.VERIFY_EMAIL.subject,
      templateId: sendGrid.template.VERIFY_EMAIL.id,
      templateName: sendGrid.template.VERIFY_EMAIL.name,
      dynamicTemplateData,
    });

    return { success: true };
  }

  async verifyCode(verifyCodeDto: VerifyUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: verifyCodeDto.email },
    });

    if (!user) {
      throw new BadRequestException('Something went wrong');
    }

    if (user.verificationCode !== verifyCodeDto.verificationCode) {
      throw new BadRequestException('Wrong code');
    }

    if (!dayjs().isBefore(dayjs(user.codeExpiresAt))) {
      throw new BadRequestException('Code is already expires');
    }

    await this.userRepository.update(verifyCodeDto, {
      verifiedAt: new Date(),
      verificationCode: null,
      codeExpiresAt: null,
    });

    return { success: true };
  }

  async changePassword(userLoginDto: UserLoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: userLoginDto.email },
    });

    if (!user) {
      throw new BadRequestException('Something went wrong');
    }

    const encryptedPassword = await getEncryptedPassword(userLoginDto.password);
    const dataForUpdate = {
      password: encryptedPassword,
    };

    await this.userRepository.update(
      {
        id: user.id,
      },
      dataForUpdate,
    );

    await this.emailSystemService.create({
      email: userLoginDto.email,
      subject: sendGrid.template.CHANGE_PASSWORD_SUCCESS.subject,
      templateId: sendGrid.template.CHANGE_PASSWORD_SUCCESS.id,
      templateName: sendGrid.template.CHANGE_PASSWORD_SUCCESS.name,
      dynamicTemplateData: {},
    });

    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: Date.now().toString(),
      }),
    };
  }
}
