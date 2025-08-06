'use client';

import { Card } from '@/types/card';
import { CreditCard, DollarSign, Award, AlertCircle, CheckCircle } from 'lucide-react';

interface CardPreviewProps {
  card: Card;
  onRenew?: (cardId: string) => void;
}

export default function CardPreview({ card, onRenew }: CardPreviewProps) {
  const getCardTypeColor = (type: string) => {
    switch (type) {
      case 'credit': return 'from-blue-600 to-blue-800';
      case 'debit': return 'from-green-600 to-green-800';
      case 'business': return 'from-purple-600 to-purple-800';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'blocked': return 'text-gray-600 bg-gray-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'expired': return <AlertCircle className="w-4 h-4" />;
      case 'blocked': return <AlertCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const isExpired = card.status === 'expired';
  const isExpiringSoon = () => {
    const expiryDate = new Date(`20${card.expiryDate.split('/')[1]}-${card.expiryDate.split('/')[0]}-01`);
    const today = new Date();
    const threeMonthsFromNow = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
    return expiryDate <= threeMonthsFromNow && expiryDate > today;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Card Visual */}
      <div className={`bg-gradient-to-br ${getCardTypeColor(card.cardType)} p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 opacity-10">
          <CreditCard className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-bold">{card.cardName}</h3>
              <p className="text-sm opacity-80 capitalize">{card.cardType} Card</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(card.status)}`}>
              {getStatusIcon(card.status)}
              <span className="capitalize">{card.status}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-2xl font-mono tracking-wider">{card.cardNumber}</p>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-xs opacity-70">CARDHOLDER</p>
              <p className="font-medium">{card.holderName}</p>
            </div>
            <div>
              <p className="text-xs opacity-70">EXPIRES</p>
              <p className="font-medium">{card.expiryDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-6">
        {/* Expiry Warning */}
        {(isExpired || isExpiringSoon()) && (
          <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
            isExpired ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
          }`}>
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">
              {isExpired ? 'Card has expired' : 'Card expires soon'}
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">
          {card.creditLimit && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Credit Limit</span>
              </div>
              <p className="text-lg font-semibold">${card.creditLimit.toLocaleString()}</p>
              {card.availableBalance && (
                <p className="text-xs text-gray-500">
                  Available: ${card.availableBalance.toLocaleString()}
                </p>
              )}
            </div>
          )}
          
          {card.availableBalance && !card.creditLimit && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Balance</span>
              </div>
              <p className="text-lg font-semibold">${card.availableBalance.toLocaleString()}</p>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">Rewards</span>
            </div>
            <p className="text-lg font-semibold">{card.rewards.rate}%</p>
            <p className="text-xs text-gray-500 capitalize">{card.rewards.type}</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Benefits</h4>
          <div className="flex flex-wrap gap-2">
            {card.benefits.map((benefit, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>

        {/* Annual Fee */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Annual Fee</span>
            <span className="font-semibold">
              {card.annualFee === 0 ? 'Free' : `$${card.annualFee}`}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {(isExpired || isExpiringSoon()) && onRenew && (
            <button
              onClick={() => onRenew(card.id)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {isExpired ? 'Renew Card' : 'Renew Early'}
            </button>
          )}
          <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}