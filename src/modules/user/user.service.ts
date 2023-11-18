import { getEncryptedPassword } from "./../../helpers/get-encrypted-password";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as dayjs from "dayjs";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserTypes } from "src/helpers/user-types";
import { randomCode } from "../../utils/random-code";
import { EmailSystemService } from "../email/email.service";
import { sendGrid } from "../../helpers/sendGrid";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly emailSystemService: EmailSystemService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const encryptedPassword = await getEncryptedPassword(
      createUserDto.password
    );
    const verificationCode = randomCode();
    const dataForInsert = {
      email: createUserDto.email,
      codeExpiresAt: dayjs().add(3, "day").format(),
      phoneNumber: createUserDto.phoneNumber,
      password: encryptedPassword,
      type: UserTypes.ADMIN,
      verificationCode,
    };

    const newUser = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(dataForInsert)
      .orUpdate(
        [...Object.keys(dataForInsert), "deletedAt", "updatedAt"],
        "UQ_97672ac88f789774dd47f7c8be3"
      )
      .execute();
    // Send email
    const dynamicTemplateData = {
      code: verificationCode,
    };
    await this.emailSystemService.create({
      email: createUserDto.email,
      subject: sendGrid.template.VERIFY_EMAIL.subject,
      templateId: sendGrid.template.VERIFY_EMAIL.id,
      templateName: sendGrid.template.VERIFY_EMAIL.name,
      dynamicTemplateData,
    });

    return { success: true };
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...updateUserDto });
  }

  remove(id: number) {
    return this.userRepository.softDelete({ id });
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
