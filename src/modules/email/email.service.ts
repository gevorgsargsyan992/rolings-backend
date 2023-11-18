import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { sendGrid } from '../../helpers/sendGrid';
import { EmailCreateDto } from './dto/email-create.dto';
import { EmailSystem } from './entities/email.entity';

@Injectable()
export class EmailSystemService {
  constructor(
    @InjectRepository(EmailSystem)
    private emailSystem: Repository<EmailSystem>,
  ) {}

  async create(data: EmailCreateDto) {
    const dataToSend = {
      to: data.email,
      templateId: data.templateId,
      dynamicTemplateData: data.dynamicTemplateData,
    };
    await this.emailSystem.save({
      subject: data.subject,
      template: data.templateName,
      email: data.email,
      dynamicTemplateData: data.dynamicTemplateData,
    });
    return sendGrid.sendEmail(dataToSend);
  }
}
