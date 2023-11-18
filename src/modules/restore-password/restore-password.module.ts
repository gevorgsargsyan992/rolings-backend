import { Module } from '@nestjs/common';
import { RestorePasswordService } from './restore-password.service';
import { RestorePasswordController } from './restore-password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { EmailSystemModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigs } from 'src/config/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    EmailSystemModule,
    JwtModule.register(JwtConfigs),
  ],
  controllers: [RestorePasswordController],
  providers: [RestorePasswordService],
})
export class RestorePasswordModule {}
