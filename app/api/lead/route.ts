import { NextResponse } from 'next/server';
import { sanitizeInput } from '../../../utils/security';
import { logger } from '../../../utils/logger';
import { checkRateLimit } from '../../../utils/rateLimiter';

interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  project?: string;
  visitDate?: string;
  visitTime?: string;
  message?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export async function POST(request: Request) {
  try {
    // 0. Rate limiting check
    const clientIp = request.headers.get('x-forwarded-for') || 'client-ip';
    const rateLimit = checkRateLimit(clientIp, 5, 10 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { success: false, error: 'Too many lead submissions. Please wait 10 minutes before submitting again.' },
        { status: 429 }
      );
    }

    const body: LeadPayload = await request.json();

    // 1. Sanitize inputs
    const sanitizedName = sanitizeInput(body.name || '');
    const sanitizedPhone = sanitizeInput(body.phone || '');
    const sanitizedEmail = sanitizeInput(body.email || '');
    const sanitizedProject = sanitizeInput(body.project || 'General Inquiry');
    const sanitizedMessage = sanitizeInput(body.message || '');
    const utmSource = sanitizeInput(body.utmSource || 'Direct');

    // 2. Validate mandatory fields
    if (!sanitizedName || sanitizedName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!sanitizedPhone || !phoneRegex.test(sanitizedPhone)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    // 3. Log lead creation
    const leadRefId = `SKYI-${Date.now().toString(36).toUpperCase()}`;
    logger.log(`[Serverless Lead Engine] Lead Received ${leadRefId}`, {
      name: sanitizedName,
      phone: sanitizedPhone,
      email: sanitizedEmail,
      project: sanitizedProject,
      message: sanitizedMessage,
      source: utmSource,
    });

    // 4. Return success response
    return NextResponse.json(
      {
        success: true,
        leadId: leadRefId,
        message: 'Thank you! Your VIP consultation request has been registered. Our advisor will reach out within 20 minutes.',
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error('[Serverless Lead Engine Error]', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred. Please try again or call +91 20 6614 3000.' },
      { status: 500 }
    );
  }
}
