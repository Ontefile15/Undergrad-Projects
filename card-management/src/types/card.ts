export interface Card {
  id: string;
  cardNumber: string;
  cardType: 'credit' | 'debit' | 'business';
  cardName: string;
  holderName: string;
  expiryDate: string;
  issueDate: string;
  status: 'active' | 'expired' | 'blocked' | 'pending';
  creditLimit?: number;
  availableBalance?: number;
  annualFee: number;
  rewards: {
    type: 'cashback' | 'points' | 'miles';
    rate: number;
  };
  benefits: string[];
}

export interface CardApplication {
  id?: string;
  cardType: 'credit' | 'debit' | 'business';
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    ssn: string;
  };
  addressInfo: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  employmentInfo: {
    employer: string;
    position: string;
    annualIncome: number;
    employmentLength: string;
  };
  requestedCreditLimit?: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'pending';
  submittedAt?: string;
}

export interface CardRenewal {
  id: string;
  cardId: string;
  renewalType: 'standard' | 'upgrade' | 'downgrade';
  newCardType?: string;
  requestedFeatures?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  submittedAt: string;
  processedAt?: string;
}

export interface CardOffer {
  id: string;
  name: string;
  type: 'credit' | 'debit' | 'business';
  annualFee: number;
  creditLimit: {
    min: number;
    max: number;
  };
  rewards: {
    type: 'cashback' | 'points' | 'miles';
    rate: number;
    categories?: string[];
  };
  benefits: string[];
  introOffer?: {
    description: string;
    duration: string;
  };
  eligibility: {
    minCreditScore: number;
    minIncome: number;
  };
}