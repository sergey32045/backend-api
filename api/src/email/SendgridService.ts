import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

type IMailBody = {
  to: string | string[];
  subject: string;
  html: string;
  from?: string | { name: string; email: string };
};

@Injectable()
export class SendgridService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('email.sendGridApiKey'));
  }

  async send(mail: IMailBody) {
    if (mail.from === undefined || mail.from === null) {
      mail.from = {
        name: 'InterviewBoom',
        email: this.configService.get<string>('email.emailFrom'),
      };
    }
    const transport = await SendGrid.send({
      subject: mail.subject,
      from: mail.from,
      to: mail.to,
      html: mail.html,
    });

    console.log(`Email successfully dispatched to ${mail.to}`);
    return transport;
  }
}
