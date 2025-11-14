import { Injectable } from '@nestjs/common';


@Injectable()
export class EmailService {
    async sendEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
        // integrate with real provider or queue
        console.log('sendEmail', to, subject);
    }
}