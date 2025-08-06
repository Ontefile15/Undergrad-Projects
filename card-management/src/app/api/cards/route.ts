import { NextResponse } from 'next/server';
import { mockCards } from '@/lib/mockData';

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({
      success: true,
      data: mockCards,
      message: 'Cards retrieved successfully'
    });
  } catch {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve cards',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}