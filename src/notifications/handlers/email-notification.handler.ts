import { INotificationHandler } from "../interfaces/notification-handler.interface";

export class EmailNotificationHandler implements INotificationHandler<{ email: string; message: string }> {
  async handle({ email, message }: { email: string; message: string }) {
    console.log(`Sending email to ${email}: ${message}`);
    // Integrate actual email service here
  }
}
