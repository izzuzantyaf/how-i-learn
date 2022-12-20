import { Injectable, Logger } from '@nestjs/common';
import { SESClient } from '@aws-sdk/client-ses';
import { SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class SesService {
  private readonly logger = new Logger(SesService.name);

  // Set the AWS Region.
  protected REGION = 'us-east-1';
  // Create SES service object.
  protected sesClient = new SESClient({ region: this.REGION });

  protected createSendEmailCommand({
    fromAddress,
    toAddress,
    subject,
    htmlFormattedMessage,
    textFormattedMessage,
  }: {
    fromAddress: string;
    toAddress: string;
    subject: string;
    htmlFormattedMessage?: string;
    textFormattedMessage?: string;
  }) {
    return new SendEmailCommand({
      Destination: {
        /* required */
        CcAddresses: [
          /* more items */
        ],
        ToAddresses: [
          toAddress,
          /* more To-email addresses */
        ],
      },
      Message: {
        /* required */
        Body: {
          /* required */
          Html: {
            Charset: 'UTF-8',
            Data: htmlFormattedMessage,
          },
          Text: {
            Charset: 'UTF-8',
            Data: textFormattedMessage,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: fromAddress,
      ReplyToAddresses: [
        /* more items */
      ],
    });
  }

  async sendEmail({
    senderEmail,
    senderName,
    recipientEmail,
    subject,
    htmlFormattedMessage,
    textFormattedMessage,
  }: {
    senderEmail: string;
    senderName?: string;
    recipientEmail: string;
    subject: string;
    htmlFormattedMessage?: string;
    textFormattedMessage?: string;
  }) {
    if (senderName) {
      senderEmail = `"${senderName}" <${senderEmail}>`;
    }
    const sendEmailCommand = this.createSendEmailCommand({
      fromAddress: senderEmail,
      toAddress: recipientEmail,
      subject,
      htmlFormattedMessage,
      textFormattedMessage,
    });
    const sendEmailResponse = await this.sesClient.send(sendEmailCommand);
    this.logger.debug(
      `Email send response: ${JSON.stringify(sendEmailResponse, undefined, 2)}`,
    );
    return sendEmailResponse;
  }
}
