import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailSystemService } from './email.service';
import { EmailSystem } from './entities/email.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailSystem])],
  providers: [EmailSystemService],
  exports: [EmailSystemService],
})
export class EmailSystemModule {}
