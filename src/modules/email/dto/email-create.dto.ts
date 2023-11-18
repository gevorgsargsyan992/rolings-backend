export class EmailCreateDto {
  email: string;
  subject: string;
  templateId: string;
  templateName: string;
  dynamicTemplateData: object;
}
