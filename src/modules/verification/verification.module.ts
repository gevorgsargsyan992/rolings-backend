import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { User } from '../user/entities/user.entity';
import { JwtConfigs } from '../../config/jwt';
import { EmailSystemModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    EmailSystemModule,
    JwtModule.register(JwtConfigs),
  ],
  controllers: [VerificationController],
  providers: [VerificationService],
})
export class VerificationModule {}
