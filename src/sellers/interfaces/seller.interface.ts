export interface ISeller {
    id: string;
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
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ISellerWithUser extends ISeller {
    user: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
    };
  }