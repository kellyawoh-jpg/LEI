function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': process.env.FRONTEND_ORIGIN || '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

export default async function handler(request) {
  if (request.method === 'OPTIONS') return jsonResponse({}, 204);
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed.' }, 405);

  try {
    const { phone, code } = await request.json();
    if (!/^\+[1-9]\d{7,14}$/.test(phone) || !/^\d{6}$/.test(code)) {
      return jsonResponse({ error: 'Enter a valid phone number and 6-digit code.' }, 400);
    }

    const credentials = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
    const body = new URLSearchParams({ To: phone, Code: code });
    const response = await fetch(`https://verify.twilio.com/v2/Services/${process.env.TWILIO_VERIFY_SERVICE_SID}/VerificationCheck`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });
    const result = await response.json();

    if (!response.ok || result.status !== 'approved') {
      return jsonResponse({ error: 'Invalid or expired verification code.' }, 400);
    }

    return jsonResponse({ verified: true });
  } catch {
    return jsonResponse({ error: 'Unable to verify the code.' }, 500);
  }
}