import { JwtModuleOptions } from '@nestjs/jwt';

export const JwtConfigs: JwtModuleOptions = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_DEFAULT_EXPIRES },
};
