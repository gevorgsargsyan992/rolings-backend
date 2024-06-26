import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import * as dayjs from "dayjs";
import { MailerService } from "@nestjs-modules/mailer";

import { User } from "../user/entities/user.entity";
import { sendGrid } from "../../helpers/sendGrid";
import { EmailSystemService } from "../email/email.service";
import { randomCode } from "../../utils/random-code";
import { VerifyUserDto } from "./dto/verify-user.dto";
import { ResendVerificationCodeDto } from "./dto/resend-verification-code.dto";
import { LoginTypes } from "../../helpers/login-types";

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly emailSystemService: EmailSystemService
  ) {}

  async update(verifyUserDto: VerifyUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: verifyUserDto.email },
    });
    if (!user) {
      throw new BadRequestException("Something went wrong");
    }
    if (user.verifiedAt) {
      throw new BadRequestException("User already verified");
    }
    if (user.verificationCode !== verifyUserDto.verificationCode) {
      throw new BadRequestException("Wrong code");
    }
    if (!dayjs().isBefore(dayjs(user.codeExpiresAt))) {
      throw new BadRequestException("Code is already expires");
    }
    await this.userRepository.update(verifyUserDto, {
      verifiedAt: new Date(),
      verificationCode: null,
      codeExpiresAt: null,
    });

    return {
      access_token: this.jwtService.sign({
        email: user.email,
        type: LoginTypes.USER,
        sub: Date.now().toString(),
      }),
      id: user.id,
    };
  }

  async resendVerificationCode(dto: ResendVerificationCodeDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new BadRequestException("Something went wrong");
    }

    const verificationCode = randomCode();
    await this.userRepository.update(
      {
        id: user.id,
      },
      {
        verificationCode,
      }
    );
    const dynamicTemplateData = {
      code: verificationCode,
    };
    await this.emailSystemService.create({
      email: user.email,
      subject: sendGrid.template.VERIFY_EMAIL.subject,
      templateId: sendGrid.template.VERIFY_EMAIL.id,
      templateName: sendGrid.template.VERIFY_EMAIL.name,
      dynamicTemplateData,
    });
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Confirm your Email",
      template: "./confirmation",
      context: {
        name: user.firstName,
        code: verificationCode,
      },
    });
    return {
      success: true,
    };
  }
}
