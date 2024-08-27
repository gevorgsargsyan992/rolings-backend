import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

import { randomCode } from '../../utils/random-code';
import { getEncryptedPassword } from './../../helpers/get-encrypted-password';
import { User } from '../user/entities/user.entity';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { VerifyUserDto } from '../verification/dto/verify-user.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class RestorePasswordService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
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
        codeExpiresAt: dayjs().add(2, "day").format(),
      },
    );
    // Send email
    try {
      await this.mailerService.sendMail({
        to: verifyEmailDto.email,
        subject: "Restore Password",
        template: "./restorePassword", // The name of the template file
        context: {
          // Data to be sent to template engine
          name: existingOrg.companyName,
          code: verificationCode,
        },
      });
    } catch (error) {
      console.log(111111, error);
    }

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

    const encryptedPassword = await getEncryptedPassword(verifyCodeDto.password);

    await this.userRepository.update({email: verifyCodeDto.email}, {
      verifiedAt: new Date(),
      verificationCode: null,
      codeExpiresAt: null,
      password: encryptedPassword,
    });

    return { success: true };
  }
}
