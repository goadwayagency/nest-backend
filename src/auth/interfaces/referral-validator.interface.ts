export interface IReferralValidator {
    validate(code: string): Promise<boolean>;
  }
  