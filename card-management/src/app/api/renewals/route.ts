import { NextRequest, NextResponse } from 'next/server';
import { mockRenewals } from '@/lib/mockData';
import { CardRenewal } from '@/types/card';

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return NextResponse.json({
      success: true,
      data: mockRenewals,
      message: 'Renewals retrieved successfully'
    });
  } catch {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve renewals',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const renewal: Omit<CardRenewal, 'id'> = await request.json();
    
    // Simulate validation
    if (!renewal.cardId || !renewal.renewalType) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required renewal information',
          message: 'Card ID and renewal type are required'
        },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would save to database
    const newRenewal: CardRenewal = {
      ...renewal,
      id: `renewal-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: newRenewal,
      message: 'Renewal request submitted successfully'
    }, { status: 201 });
    
  } catch {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit renewal request',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}