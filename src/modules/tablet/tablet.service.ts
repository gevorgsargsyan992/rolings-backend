import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateTabletDto } from "./dto/create-tablet.dto";
import { Tablet } from "./entities/tablet.entity";
import { getEncryptedPassword } from "src/helpers/get-encrypted-password";

@Injectable()
export class TabletService {
  constructor(
    @InjectRepository(Tablet)
    private tabletRepository: Repository<Tablet>
  ) {}

  async create(body: CreateTabletDto) {
    const token = await getEncryptedPassword(body.uuid);
    const dataForInsert = {
      uuid: body.uuid,
      status: body.status,
      token,
    };
    const newTablet = await this.tabletRepository
      .createQueryBuilder()
      .insert()
      .into(Tablet)
      .values(dataForInsert)
      .execute();
    // create tablet
    return newTablet;
  }

  async validate(email: string) {
    const tablet = await this.tabletRepository.findOne({
      where: { uuid: email },
    });
    if (!tablet) {
      return null;
    }
    return tablet;
  }
}
