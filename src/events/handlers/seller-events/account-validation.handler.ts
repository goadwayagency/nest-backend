import { Injectable } from "@nestjs/common";
import { EventHandler } from "../event.handler";

@Injectable()
export class AccountValidationHandler implements EventHandler {
  supports(eventType: string) {
    return eventType === 'ACCOUNT_VALIDATION';
  }

  async handle(payload: { userId: string }) {
    console.log(`Validating account for user ${payload.userId}`);
  }
}
