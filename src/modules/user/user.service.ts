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
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly mailerService: MailerService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const encryptedPassword = await getEncryptedPassword(
      createUserDto.password
    );
    const verificationCode = randomCode();
    const dataForInsert = {
      email: createUserDto.email,
      companyName: createUserDto.companyName,
      codeExpiresAt: dayjs().add(3, "day").format(),
      phoneNumber: createUserDto.phoneNumber,
      password: encryptedPassword,
      type: UserTypes.SELLER,
      verificationCode,
    };

    await this.userRepository
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
    try {
      await this.mailerService.sendMail({
        to: createUserDto.email,
        subject: "Confirm your Email",
        template: "./confirmation", // The name of the template file
        context: {
          // Data to be sent to template engine
          name: createUserDto.name,
          code: verificationCode,
        },
      });
    } catch (error) {
      console.log(111111, error);
    }

    return { success: true };
  }

  findAll() {
    return this.userRepository
      .createQueryBuilder("u")
      .select([
        `u.id AS id`,
        `u.email AS email`,
        `u.type AS type`,
        `u.firstName AS "firstName"`,
        `u.lastName AS "lastName"`,
        `u.companyName AS "companyName"`,
        `u.avatarImage AS "avatarImage"`,
        `u.phoneNumber AS "phoneNumber"`,
      ])
      .getRawMany();
  }

  userSettings(id: number) {
      return this.userRepository
          .createQueryBuilder("u")
          .where({ id })
          .select([
              `u.id AS id`,
              `u.firstName AS "firstName"`,
              `u.lastName AS "lastName"`,
              `u.companyName AS "companyName"`,
              `u.avatarImage AS "avatarImage"`,
              `u.phoneNumber AS "phoneNumber"`,
          ])
          .getRawOne();
  }

  findOne(id: number) {
    return this.userRepository
      .createQueryBuilder("u")
      .where({ id })
      .select([
        `u.id AS id`,
        `u.type AS type`,
        `u.firstName AS "firstName"`,
        `u.lastName AS "lastName"`,
        `u.companyName AS "companyName"`,
        `u.avatarImage AS "avatarImage"`,
        `u.phoneNumber AS "phoneNumber"`,
        `u.verificationCode AS "verificationCode"`,
      ])
      .getRawOne();
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
