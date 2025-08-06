'use client';

import { useState } from 'react';
import { CardApplication, CardOffer } from '@/types/card';
import { ChevronRight, ChevronLeft, User, MapPin, Briefcase, CreditCard } from 'lucide-react';

interface CardApplicationProps {
  offers: CardOffer[];
  onSubmit: (application: CardApplication) => void;
  onCancel: () => void;
}

export default function CardApplicationForm({ offers, onSubmit, onCancel }: CardApplicationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState<CardOffer | null>(null);
  const [application, setApplication] = useState<CardApplication>({
    cardType: 'credit',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      ssn: '',
    },
    addressInfo: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    employmentInfo: {
      employer: '',
      position: '',
      annualIncome: 0,
      employmentLength: '',
    },
    status: 'draft'
  });

  const steps = [
    { id: 0, title: 'Choose Card', icon: CreditCard },
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Address', icon: MapPin },
    { id: 3, title: 'Employment', icon: Briefcase },
    { id: 4, title: 'Review', icon: ChevronRight },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const finalApplication: CardApplication = {
      ...application,
      cardType: selectedOffer?.type || 'credit',
      requestedCreditLimit: selectedOffer?.creditLimit.max,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    };
    onSubmit(finalApplication);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setApplication(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateAddressInfo = (field: string, value: string) => {
    setApplication(prev => ({
      ...prev,
      addressInfo: { ...prev.addressInfo, [field]: value }
    }));
  };

  const updateEmploymentInfo = (field: string, value: string | number) => {
    setApplication(prev => ({
      ...prev,
      employmentInfo: { ...prev.employmentInfo, [field]: value }
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return selectedOffer !== null;
      case 1: 
        return application.personalInfo.firstName && 
               application.personalInfo.lastName && 
               application.personalInfo.email &&
               application.personalInfo.phone &&
               application.personalInfo.dateOfBirth &&
               application.personalInfo.ssn;
      case 2:
        return application.addressInfo.street &&
               application.addressInfo.city &&
               application.addressInfo.state &&
               application.addressInfo.zipCode;
      case 3:
        return application.employmentInfo.employer &&
               application.employmentInfo.position &&
               application.employmentInfo.annualIncome > 0 &&
               application.employmentInfo.employmentLength;
      default: return true;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-gray-300 mx-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        {/* Step 0: Choose Card */}
        {currentStep === 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Card</h2>
            <div className="grid gap-6">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                    selectedOffer?.id === offer.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedOffer(offer)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{offer.name}</h3>
                      <p className="text-gray-600 capitalize">{offer.type} Card</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        {offer.annualFee === 0 ? 'No Annual Fee' : `$${offer.annualFee}/year`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {offer.rewards.rate}% {offer.rewards.type}
                      </p>
                    </div>
                  </div>

                  {offer.introOffer && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <p className="text-green-800 font-medium text-sm">
                        🎉 {offer.introOffer.description}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Benefits</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {offer.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Credit Limit</h4>
                      <p className="text-sm text-gray-600">
                        ${offer.creditLimit.min.toLocaleString()} - ${offer.creditLimit.max.toLocaleString()}
                      </p>
                      <h4 className="font-medium text-gray-900 mt-3 mb-2">Eligibility</h4>
                      <p className="text-sm text-gray-600">
                        Min Credit Score: {offer.eligibility.minCreditScore}
                      </p>
                      <p className="text-sm text-gray-600">
                        Min Income: ${offer.eligibility.minIncome.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={application.personalInfo.firstName}
                  onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={application.personalInfo.lastName}
                  onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={application.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={application.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={application.personalInfo.dateOfBirth}
                  onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SSN (Last 4 digits)</label>
                <input
                  type="text"
                  value={application.personalInfo.ssn}
                  onChange={(e) => updatePersonalInfo('ssn', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={4}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Address Information */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Address Information</h2>
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  value={application.addressInfo.street}
                  onChange={(e) => updateAddressInfo('street', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={application.addressInfo.city}
                    onChange={(e) => updateAddressInfo('city', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={application.addressInfo.state}
                    onChange={(e) => updateAddressInfo('state', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={application.addressInfo.zipCode}
                    onChange={(e) => updateAddressInfo('zipCode', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Employment Information */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Employment Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employer</label>
                <input
                  type="text"
                  value={application.employmentInfo.employer}
                  onChange={(e) => updateEmploymentInfo('employer', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <input
                  type="text"
                  value={application.employmentInfo.position}
                  onChange={(e) => updateEmploymentInfo('position', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
                <input
                  type="number"
                  value={application.employmentInfo.annualIncome || ''}
                  onChange={(e) => updateEmploymentInfo('annualIncome', parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employment Length</label>
                <select
                  value={application.employmentInfo.employmentLength}
                  onChange={(e) => updateEmploymentInfo('employmentLength', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select...</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && selectedOffer && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Application</h2>
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">Selected Card</h3>
                <p className="text-gray-900 font-medium">{selectedOffer.name}</p>
                <p className="text-gray-600">{selectedOffer.type} Card</p>
                <p className="text-gray-600">
                  {selectedOffer.annualFee === 0 ? 'No Annual Fee' : `$${selectedOffer.annualFee}/year`}
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">Personal Information</h3>
                <p>{application.personalInfo.firstName} {application.personalInfo.lastName}</p>
                <p>{application.personalInfo.email}</p>
                <p>{application.personalInfo.phone}</p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">Address</h3>
                <p>{application.addressInfo.street}</p>
                <p>{application.addressInfo.city}, {application.addressInfo.state} {application.addressInfo.zipCode}</p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">Employment</h3>
                <p>{application.employmentInfo.position} at {application.employmentInfo.employer}</p>
                <p>Annual Income: ${application.employmentInfo.annualIncome.toLocaleString()}</p>
                <p>Employment Length: {application.employmentInfo.employmentLength}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <div>
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}