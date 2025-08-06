import { NextRequest, NextResponse } from 'next/server';
import { mockApplications } from '@/lib/mockData';
import { CardApplication } from '@/types/card';

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json({
      success: true,
      data: mockApplications,
      message: 'Applications retrieved successfully'
    });
  } catch {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve applications',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const application: CardApplication = await request.json();
    
    // Simulate validation
    if (!application.personalInfo.firstName || !application.personalInfo.lastName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required personal information',
          message: 'First name and last name are required'
        },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would save to database
    const newApplication = {
      ...application,
      id: `app-${Date.now()}`,
      status: 'submitted' as const,
      submittedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: newApplication,
      message: 'Application submitted successfully'
    }, { status: 201 });
    
  } catch {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit application',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}