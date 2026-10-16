export async function onRequest(context) {
  const { request, env, next } = context;
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const url = new URL(request.url);
  const path = url.pathname;

  // Пропускаем статику
  if (path.match(/\.(css|js|jpg|jpeg|png|gif|svg|woff|woff2|ttf|ico)$/)) {
    return next();
  }

  // Пропускаем API
  if (path.startsWith('/api/')) {
    return next();
  }

  // Проверяем KV
  const seen = await env.IPS.get(ip);

  if (seen) {
    return new Response(`
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <title>Страница не работает</title>
        <style>
          body { background:#000; color:#f5f5f5; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; padding:20px; text-align:center; }
          .container { max-width:400px; }
          h1 { font-size:24px; margin-bottom:12px; font-weight:600; }
          p { color:#a8a8a8; font-size:14px; line-height:1.5; }
          .code { margin-top:20px; font-size:12px; color:#666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Страница не работает</h1>
          <p>Не удаётся загрузить эту страницу. Проверьте подключение к интернету или повторите попытку позже.</p>
          <p class="code">ERR_CONNECTION_REFUSED</p>
        </div>
      </body>
      </html>
    `, {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  // Первый визит — записываем IP
  await env.IPS.put(ip, new Date().toISOString(), { expirationTtl: 60 * 60 * 24 * 30 });

  return next();
}
