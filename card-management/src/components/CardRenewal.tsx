'use client';

import { useState } from 'react';
import { Card, CardRenewal, CardOffer } from '@/types/card';
import { RefreshCw, ArrowUp, ArrowDown, CheckCircle, AlertCircle } from 'lucide-react';

interface CardRenewalProps {
  card: Card;
  availableOffers: CardOffer[];
  onSubmit: (renewal: Omit<CardRenewal, 'id'>) => void;
  onCancel: () => void;
}

export default function CardRenewalForm({ card, availableOffers, onSubmit, onCancel }: CardRenewalProps) {
  const [renewalType, setRenewalType] = useState<'standard' | 'upgrade' | 'downgrade'>('standard');
  const [selectedOffer, setSelectedOffer] = useState<CardOffer | null>(null);
  const [requestedFeatures, setRequestedFeatures] = useState<string[]>([]);

  const renewalOptions = [
    {
      type: 'standard' as const,
      title: 'Standard Renewal',
      description: 'Renew your current card with the same features and benefits',
      icon: RefreshCw,
      color: 'blue'
    },
    {
      type: 'upgrade' as const,
      title: 'Upgrade Card',
      description: 'Upgrade to a premium card with enhanced benefits',
      icon: ArrowUp,
      color: 'green'
    },
    {
      type: 'downgrade' as const,
      title: 'Downgrade Card',
      description: 'Switch to a card with lower fees and basic benefits',
      icon: ArrowDown,
      color: 'orange'
    }
  ];

  const availableFeatures = [
    'Higher Credit Limit',
    'Travel Insurance',
    'Airport Lounge Access',
    'Cashback Rewards',
    'Points Rewards',
    'Miles Rewards',
    'No Foreign Transaction Fees',
    'Purchase Protection',
    'Extended Warranty',
    'Concierge Service'
  ];

  const handleSubmit = () => {
    const renewal: Omit<CardRenewal, 'id'> = {
      cardId: card.id,
      renewalType,
      newCardType: selectedOffer?.name,
      requestedFeatures: renewalType !== 'standard' ? requestedFeatures : undefined,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    onSubmit(renewal);
  };

  const getColorClasses = (color: string, selected: boolean) => {
    const colors = {
      blue: selected 
        ? 'border-blue-600 bg-blue-50 text-blue-700' 
        : 'border-gray-200 hover:border-blue-300',
      green: selected 
        ? 'border-green-600 bg-green-50 text-green-700' 
        : 'border-gray-200 hover:border-green-300',
      orange: selected 
        ? 'border-orange-600 bg-orange-50 text-orange-700' 
        : 'border-gray-200 hover:border-orange-300'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const filteredOffers = availableOffers.filter(offer => {
    if (renewalType === 'upgrade') {
      return offer.annualFee >= card.annualFee || offer.creditLimit.max > (card.creditLimit || 0);
    } else if (renewalType === 'downgrade') {
      return offer.annualFee < card.annualFee;
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Renew Your Card</h2>
                 <p className="opacity-90">Choose how you&apos;d like to renew your {card.cardName}</p>
      </div>

      <div className="p-6">
        {/* Current Card Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-lg mb-2">Current Card</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Card Name:</span>
              <p className="font-medium">{card.cardName}</p>
            </div>
            <div>
              <span className="text-gray-600">Type:</span>
              <p className="font-medium capitalize">{card.cardType}</p>
            </div>
            <div>
              <span className="text-gray-600">Annual Fee:</span>
              <p className="font-medium">{card.annualFee === 0 ? 'Free' : `$${card.annualFee}`}</p>
            </div>
            <div>
              <span className="text-gray-600">Rewards:</span>
              <p className="font-medium">{card.rewards.rate}% {card.rewards.type}</p>
            </div>
            <div>
              <span className="text-gray-600">Credit Limit:</span>
              <p className="font-medium">${card.creditLimit?.toLocaleString() || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <p className="font-medium capitalize flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-red-500" />
                {card.status}
              </p>
            </div>
          </div>
        </div>

        {/* Renewal Options */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-4">Choose Renewal Type</h3>
          <div className="grid gap-4">
            {renewalOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = renewalType === option.type;
              
              return (
                <div
                  key={option.type}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${getColorClasses(option.color, isSelected)}`}
                  onClick={() => setRenewalType(option.type)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6" />
                    <div>
                      <h4 className="font-medium text-lg">{option.title}</h4>
                      <p className="text-sm opacity-80">{option.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card Selection for Upgrade/Downgrade */}
        {renewalType !== 'standard' && (
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-4">
              {renewalType === 'upgrade' ? 'Choose Upgrade Option' : 'Choose Downgrade Option'}
            </h3>
            
            {filteredOffers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No {renewalType} options available for your current card.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedOffer?.id === offer.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedOffer(offer)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{offer.name}</h4>
                        <p className="text-gray-600 capitalize">{offer.type} Card</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {offer.annualFee === 0 ? 'No Annual Fee' : `$${offer.annualFee}/year`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {offer.rewards.rate}% {offer.rewards.type}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Benefits</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {offer.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Credit Limit Range</h5>
                        <p className="text-sm text-gray-600">
                          ${offer.creditLimit.min.toLocaleString()} - ${offer.creditLimit.max.toLocaleString()}
                        </p>
                        
                        {offer.introOffer && (
                          <div className="mt-3 p-2 bg-green-100 rounded text-xs text-green-800">
                            🎉 {offer.introOffer.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Feature Requests for Upgrades */}
        {renewalType === 'upgrade' && (
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-4">Additional Features (Optional)</h3>
                         <p className="text-gray-600 text-sm mb-4">
               Select any additional features you&apos;d like to request with your upgrade:
             </p>
            <div className="grid grid-cols-2 gap-3">
              {availableFeatures.map((feature) => (
                <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requestedFeatures.includes(feature)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRequestedFeatures([...requestedFeatures, feature]);
                      } else {
                        setRequestedFeatures(requestedFeatures.filter(f => f !== feature));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{feature}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-lg mb-3">Renewal Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Renewal Type:</span>
              <span className="font-medium capitalize">{renewalType}</span>
            </div>
            {selectedOffer && (
              <>
                <div className="flex justify-between">
                  <span>New Card:</span>
                  <span className="font-medium">{selectedOffer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Fee:</span>
                  <span className="font-medium">
                    {selectedOffer.annualFee === 0 ? 'Free' : `$${selectedOffer.annualFee}`}
                  </span>
                </div>
              </>
            )}
            {requestedFeatures.length > 0 && (
              <div>
                <span>Requested Features:</span>
                <ul className="mt-1 ml-4">
                  {requestedFeatures.map((feature) => (
                    <li key={feature} className="text-xs">• {feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={renewalType !== 'standard' && !selectedOffer}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
          >
            Submit Renewal Request
          </button>
        </div>
      </div>
    </div>
  );
}