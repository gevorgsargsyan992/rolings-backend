import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../entities/user.entity";

@Injectable()
export class UniqueFieldsGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const existingOrg = await this.userRepository.findOne({
      where: [{ email: request?.body?.email }],
    });
    if (existingOrg) {
      throw new BadRequestException("Email or Tin are already used");
    }
    return true;
  }
}
