import { Injectable, Logger } from '@nestjs/common';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { IEmailProvider } from '../interfaces/email-provider.interface';

@Injectable()
export class BrevoEmailProvider implements IEmailProvider {
  private readonly logger = new Logger(BrevoEmailProvider.name);
  private readonly api: SibApiV3Sdk.TransactionalEmailsApi;

  constructor() {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
    this.api = new SibApiV3Sdk.TransactionalEmailsApi();
  }

  async sendEmail({ to, subject, body, templateId, params }: Parameters<IEmailProvider['sendEmail']>[0]) {
    try {
      if (templateId) {
        await this.api.sendTransacEmail({ to: [{ email: to }], templateId, params });
        this.logger.log(`Sent Brevo template ${templateId} to ${to}`);
      } else {
        await this.api.sendTransacEmail({ to: [{ email: to }], subject, htmlContent: body });
        this.logger.log(`Sent Brevo email to ${to} with subject "${subject}"`);
      }
    } catch (err) {
      this.logger.error(`Failed to send Brevo email to ${to}`, err as any);
    }
  }
}
