import { Card, CardApplication, CardRenewal, CardOffer } from '@/types/card';

export const mockCards: Card[] = [
  {
    id: '1',
    cardNumber: '**** **** **** 1234',
    cardType: 'credit',
    cardName: 'Premium Rewards Card',
    holderName: 'John Doe',
    expiryDate: '12/2026',
    issueDate: '12/2021',
    status: 'active',
    creditLimit: 15000,
    availableBalance: 12500,
    annualFee: 95,
    rewards: {
      type: 'cashback',
      rate: 2.5
    },
    benefits: ['Travel Insurance', 'Purchase Protection', 'Extended Warranty', 'Concierge Service']
  },
  {
    id: '2',
    cardNumber: '**** **** **** 5678',
    cardType: 'debit',
    cardName: 'Everyday Banking Card',
    holderName: 'John Doe',
    expiryDate: '08/2024',
    issueDate: '08/2019',
    status: 'expired',
    availableBalance: 2500,
    annualFee: 0,
    rewards: {
      type: 'points',
      rate: 1
    },
    benefits: ['ATM Fee Reimbursement', 'Mobile Banking']
  },
  {
    id: '3',
    cardNumber: '**** **** **** 9012',
    cardType: 'business',
    cardName: 'Business Elite Card',
    holderName: 'John Doe',
    expiryDate: '03/2025',
    issueDate: '03/2020',
    status: 'active',
    creditLimit: 25000,
    availableBalance: 18000,
    annualFee: 150,
    rewards: {
      type: 'miles',
      rate: 3
    },
    benefits: ['Business Lounge Access', 'Expense Management Tools', 'Travel Benefits', 'Higher Limits']
  }
];

export const mockCardOffers: CardOffer[] = [
  {
    id: 'offer-1',
    name: 'Platinum Cashback Card',
    type: 'credit',
    annualFee: 0,
    creditLimit: {
      min: 1000,
      max: 20000
    },
    rewards: {
      type: 'cashback',
      rate: 1.5,
      categories: ['Groceries', 'Gas', 'Dining']
    },
    benefits: [
      'No Annual Fee',
      '0% APR for 12 months',
      'Contactless Payments',
      'Fraud Protection'
    ],
    introOffer: {
      description: '$200 bonus after spending $1,000 in first 3 months',
      duration: '3 months'
    },
    eligibility: {
      minCreditScore: 650,
      minIncome: 25000
    }
  },
  {
    id: 'offer-2',
    name: 'Travel Rewards Premium',
    type: 'credit',
    annualFee: 125,
    creditLimit: {
      min: 5000,
      max: 50000
    },
    rewards: {
      type: 'miles',
      rate: 2,
      categories: ['Travel', 'Dining', 'Gas']
    },
    benefits: [
      'Airport Lounge Access',
      'Travel Insurance',
      'No Foreign Transaction Fees',
      'Priority Boarding',
      'Hotel Upgrades'
    ],
    introOffer: {
      description: '60,000 bonus miles after spending $4,000 in first 3 months',
      duration: '3 months'
    },
    eligibility: {
      minCreditScore: 700,
      minIncome: 50000
    }
  },
  {
    id: 'offer-3',
    name: 'Business Pro Card',
    type: 'business',
    annualFee: 99,
    creditLimit: {
      min: 10000,
      max: 100000
    },
    rewards: {
      type: 'points',
      rate: 2.5,
      categories: ['Office Supplies', 'Internet', 'Phone']
    },
    benefits: [
      'Expense Management Tools',
      'Employee Cards',
      'Business Insurance',
      'Accounting Integration',
      '24/7 Business Support'
    ],
    introOffer: {
      description: '50,000 bonus points after spending $5,000 in first 3 months',
      duration: '3 months'
    },
    eligibility: {
      minCreditScore: 680,
      minIncome: 75000
    }
  }
];

export const mockApplications: CardApplication[] = [
  {
    id: 'app-1',
    cardType: 'credit',
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1985-06-15',
      ssn: '***-**-1234'
    },
    addressInfo: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345'
    },
    employmentInfo: {
      employer: 'Tech Corp',
      position: 'Software Engineer',
      annualIncome: 85000,
      employmentLength: '3 years'
    },
    requestedCreditLimit: 15000,
    status: 'pending',
    submittedAt: '2024-01-15T10:30:00Z'
  }
];

export const mockRenewals: CardRenewal[] = [
  {
    id: 'renewal-1',
    cardId: '2',
    renewalType: 'upgrade',
    newCardType: 'Premium Debit Card',
    requestedFeatures: ['Higher ATM Limits', 'Travel Benefits'],
    status: 'pending',
    submittedAt: '2024-01-10T14:20:00Z'
  }
];