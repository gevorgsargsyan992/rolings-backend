import { BadRequestException } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';

SendGrid.setApiKey(process.env.SEND_GRID_API_KEY);

const fromSend = {
  email: 'info@fiscal.am',
  name: 'Fiscal',
};

const template = {
  VERIFY_EMAIL: {
    name: 'Verify Email',
    subject: 'Verification',
    id: 'd-12c9a72c185244cab91c9f4aad982888',
  },
  VERIFY_SUCCESS: {
    name: 'Verify Success',
    subject: 'Success Verification',
    id: 'd-882d4feb3c0d42d89d4a1e5c926aa656',
  },
  CHANGE_PASSWORD_SUCCESS: {
    name: 'Password Change Success',
    subject: 'Successful Password Change',
    id: 'd-c651df3a8c17404c9492783be4518c76',
  },
};

interface SendEmailData {
  to: string;
  templateId: string;
  dynamicTemplateData: object;
  subject?: string;
  bcc?: [];
  text?: string;
  html?: string;
  substitutions?: [];
}

const sendEmail = async (data: SendEmailData) => {
  if (!data.to || !data.templateId) {
    throw new BadRequestException('required params are missing');
  }
  if (!process.env.SEND_GRID_API_KEY) {
    throw new BadRequestException('Api key is required');
  }

  const msg = {
    to: data.to,
    from: {
      email: fromSend.email,
      name: fromSend.name,
    },
    subject: data.subject || ' ',
    bcc: data.bcc || [],
    text: data.text || ' ',
    html: data.html || ' ',
    substitutions: data.substitutions || {},
    templateId: data.templateId,
    dynamic_template_data: data.dynamicTemplateData || {},
  };
  return SendGrid.send(msg);
};

export const sendGrid = {
  fromSend,
  template,
  sendEmail,
};
