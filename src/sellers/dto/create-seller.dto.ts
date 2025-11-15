export class CreateSellerDto {
    firstName: string;
    lastName: string;
    street: string;
    houseNumber: string;
    country: string;
    postalCode: string;
    idDocument?: Buffer;
    mobileNumber: string;
    acceptTerms: boolean;
    userId: string;
  }