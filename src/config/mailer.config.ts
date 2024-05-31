import { MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";

export const mailerConfig: MailerOptions = {
  transport: {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use SSL for production, otherwise false
    auth: {
      user: "rolingsllc@gmail.com",
      pass: "kgtr mldv objv ulmm",
    },
  },
  defaults: {
    from: '"Rolings LLC" <rolingsllc@gmail.com>', // Default sender address
  },
  template: {
    dir: join(__dirname, "..", "templates"), // Directory containing email templates
    adapter: new HandlebarsAdapter(), // Template engine adapter
    options: {
      strict: true,
    },
  },
};
