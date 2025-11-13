// // src/notifications/services/handlers/brevo-email.handler.ts
// import { INotificationHandler } from "../interfaces/notification-handler.interface";
// // import { NotificationPayload } from "../notification.service";
// // import { EmailTemplates } from "../../templates/email-templates";
// // import fetch from "node-fetch";

// export class BrevoEmailHandler implements INotificationHandler<NotificationPayload> {
//   constructor(private readonly apiKey: string) {}

//   async handle({ email, template, params }: NotificationPayload) {
//     const templateInfo = EmailTemplates[template];
//     if (!templateInfo) throw new Error(`Template ${template} not found`);

//     await fetch("https://api.brevo.com/v3/smtp/email", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "api-key": this.apiKey,
//       },
//       body: JSON.stringify({
//         sender: { name: "My App", email: "no-reply@myapp.com" },
//         to: [{ email }],
//         templateId: templateInfo.id,
//         params,
//       }),
//     });
//   }
// }
