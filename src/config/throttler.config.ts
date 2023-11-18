import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerOptionsFactory } from '@nestjs/throttler';
import { EnvKeys } from './configuration';

@Injectable()
export class ThrottlerOptions implements ThrottlerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createThrottlerOptions() {
    return {
      ttl: this.configService.getOrThrow(EnvKeys.THROTTLE_TTL),
      limit: this.configService.getOrThrow(EnvKeys.THROTTLE_LIMIT),
    };
  }
}
