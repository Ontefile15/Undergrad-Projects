'use client';

import { useState } from 'react';
import { Card, CardApplication, CardRenewal } from '@/types/card';
import { mockCards, mockCardOffers, mockApplications, mockRenewals } from '@/lib/mockData';
import CardPreview from '@/components/CardPreview';
import CardApplicationForm from '@/components/CardApplication';
import CardRenewalForm from '@/components/CardRenewal';
import { Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

type View = 'dashboard' | 'apply' | 'renew';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [cards] = useState<Card[]>(mockCards);
  const [applications, setApplications] = useState<CardApplication[]>(mockApplications);
  const [renewals, setRenewals] = useState<CardRenewal[]>(mockRenewals);
  const [selectedCardForRenewal, setSelectedCardForRenewal] = useState<Card | null>(null);

  const handleCardRenewal = (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    if (card) {
      setSelectedCardForRenewal(card);
      setCurrentView('renew');
    }
  };

  const handleApplicationSubmit = (application: CardApplication) => {
    const newApplication = {
      ...application,
      id: `app-${Date.now()}`,
    };
    setApplications(prev => [...prev, newApplication]);
    setCurrentView('dashboard');
    
    // Show success message (in a real app, this would be handled by a notification system)
    alert('Application submitted successfully! You will receive an update within 5-7 business days.');
  };

  const handleRenewalSubmit = (renewal: Omit<CardRenewal, 'id'>) => {
    const newRenewal = {
      ...renewal,
      id: `renewal-${Date.now()}`,
    };
    setRenewals(prev => [...prev, newRenewal]);
    setCurrentView('dashboard');
    setSelectedCardForRenewal(null);
    
    // Show success message
    alert('Renewal request submitted successfully! Processing typically takes 3-5 business days.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'approved': case 'completed': 
        return 'text-green-600 bg-green-100';
      case 'pending': case 'submitted':
        return 'text-yellow-600 bg-yellow-100';
      case 'expired': case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': case 'approved': case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending': case 'submitted':
        return <Clock className="w-4 h-4" />;
      case 'expired': case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (currentView === 'apply') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <CardApplicationForm
            offers={mockCardOffers}
            onSubmit={handleApplicationSubmit}
            onCancel={() => setCurrentView('dashboard')}
          />
        </div>
      </div>
    );
  }

  if (currentView === 'renew' && selectedCardForRenewal) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <CardRenewalForm
            card={selectedCardForRenewal}
            availableOffers={mockCardOffers}
            onSubmit={handleRenewalSubmit}
            onCancel={() => {
              setCurrentView('dashboard');
              setSelectedCardForRenewal(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Card Management</h1>
              <p className="text-gray-600 mt-1">Manage your cards, apply for new ones, and renew expired cards</p>
            </div>
            <button
              onClick={() => setCurrentView('apply')}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              <Plus className="w-5 h-5" />
              Apply for New Card
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cards</p>
                <p className="text-2xl font-bold text-gray-900">{cards.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Cards</p>
                <p className="text-2xl font-bold text-green-600">
                  {cards.filter(card => card.status === 'active').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expired Cards</p>
                <p className="text-2xl font-bold text-red-600">
                  {cards.filter(card => card.status === 'expired').length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Applications</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {applications.filter(app => app.status === 'pending' || app.status === 'submitted').length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* My Cards Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Cards</h2>
          {cards.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-500 mb-4">You don&apos;t have any cards yet.</p>
              <button
                onClick={() => setCurrentView('apply')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Apply for Your First Card
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {cards.map((card) => (
                <CardPreview
                  key={card.id}
                  card={card}
                  onRenew={handleCardRenewal}
                />
              ))}
            </div>
          )}
        </section>

        {/* Applications Section */}
        {applications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Applications</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Application ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Card Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((application) => (
                      <tr key={application.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {application.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                          {application.cardType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {application.submittedAt ? 
                            new Date(application.submittedAt).toLocaleDateString() : 
                            'Draft'
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                            {getStatusIcon(application.status)}
                            <span className="capitalize">{application.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Renewals Section */}
        {renewals.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Renewal Requests</h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Renewal ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Card
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {renewals.map((renewal) => {
                      const card = cards.find(c => c.id === renewal.cardId);
                      return (
                        <tr key={renewal.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {renewal.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {card?.cardName || 'Unknown Card'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                            {renewal.renewalType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(renewal.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(renewal.status)}`}>
                              {getStatusIcon(renewal.status)}
                              <span className="capitalize">{renewal.status}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
