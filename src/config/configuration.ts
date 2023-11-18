import * as Joi from "joi";

export enum EnvKeys {
  APP_PORT = "APP_PORT",
  APP_HOST = "APP_HOST",
  JWT_SECRET = "JWT_SECRET",
  DB_HOST = "DB_HOST",
  DB_PORT = "DB_PORT",
  DB_USERNAME = "DB_USERNAME",
  DB_PASSWORD = "DB_PASSWORD",
  DB_DATABASE = "DB_DATABASE",
  SEND_GRID_API_KEY = "SEND_GRID_API_KEY",
  JWT_DEFAULT_EXPIRES = "JWT_DEFAULT_EXPIRES",
  JWT_LONG_EXPIRES = "JWT_LONG_EXPIRES",
  TABLET_JWT_LONG_EXPIRES = "TABLET_JWT_LONG_EXPIRES",
  TABLET_PASSWORD = "TABLET_PASSWORD",
  THROTTLE_TTL = "THROTTLE_TTL",
  THROTTLE_LIMIT = "THROTTLE_LIMIT",
  ENABLE_SWAGGER = "ENABLE_SWAGGER",
  ENABLE_SENTRY = "ENABLE_SENTRY",
  SENTRY_DSN = "SENTRY_DSN",
  NODE_ENV = "NODE_ENV",
  TLS_ENABLED = "TLS_ENABLED",
}

export const configValidationSchema = Joi.object({
  [EnvKeys.APP_PORT]: Joi.number().required(),
  [EnvKeys.APP_HOST]: Joi.string().required(),
  [EnvKeys.DB_HOST]: Joi.string().required(),
  [EnvKeys.JWT_SECRET]: Joi.string().required(),
  [EnvKeys.DB_PORT]: Joi.number().default(5432).required(),
  [EnvKeys.DB_USERNAME]: Joi.string().required(),
  [EnvKeys.DB_PASSWORD]: Joi.string().required(),
  [EnvKeys.DB_DATABASE]: Joi.string().required(),
  [EnvKeys.SEND_GRID_API_KEY]: Joi.string().required(),
  [EnvKeys.JWT_DEFAULT_EXPIRES]: Joi.string().required(),
  [EnvKeys.JWT_LONG_EXPIRES]: Joi.string().required(),
  [EnvKeys.TABLET_JWT_LONG_EXPIRES]: Joi.string().required(),
  [EnvKeys.TABLET_PASSWORD]: Joi.string().required(),
  [EnvKeys.THROTTLE_TTL]: Joi.number().default(60),
  [EnvKeys.THROTTLE_LIMIT]: Joi.number().default(10),
  [EnvKeys.ENABLE_SWAGGER]: Joi.boolean().default(false),
  [EnvKeys.ENABLE_SENTRY]: Joi.boolean().default(true),
  [EnvKeys.SENTRY_DSN]: Joi.string(),
  [EnvKeys.NODE_ENV]: Joi.string()
    .valid("development", "production", "test")
    .default("development"),
  [EnvKeys.TLS_ENABLED]: Joi.boolean().default(true),
});
