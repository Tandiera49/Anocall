const channels = ['KESATUAN', 'PAM-1', 'PAM-2', 'BKO-1', 'BKO-2', 'OPS-1', 'OPS-2'];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // API 1: Login dengan Input Bebas
    if (url.pathname === '/api/login' && request.method === 'POST') {
      const { username, password } = await request.json();
      
      if (!username || username.trim() === '') {
        return Response.json({ success: false, message: 'Callsign wajib diisi!' }, { status: 400 });
      }

      // Menentukan Role: Jika ketik 'admin' jadi KODAL, sisanya ANGGOTA
      const cleanUsername = username.trim().toUpperCase();
      const role = cleanUsername === 'ADMIN' ? 'admin' : 'user';

      return Response.json({ success: true, role: role, username: cleanUsername });
    }

    // API 2: Daftar Channel
    if (url.pathname === '/api/channels' && request.method === 'GET') {
      return Response.json(channels);
    }

    // Secara default, biarkan Cloudflare menangani request ke folder "public" (index.html, dll)
    return env.__STATIC_CONTENT ? env.__STATIC_CONTENT.fetch(request) : env.ASSETS.fetch(request);
  }
};
