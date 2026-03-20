export default {
  async fetch(request, env) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Content-Type': 'application/json',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers })
    }

    const key = 'plugin-copies'

    try {
      if (request.method === 'POST') {
        const current = parseInt(await env.COUNTER.get(key) || '0', 10)
        const next = current + 1
        await env.COUNTER.put(key, String(next))
        return new Response(JSON.stringify({ count: next }), { headers })
      }

      const count = parseInt(await env.COUNTER.get(key) || '0', 10)
      return new Response(JSON.stringify({ count }), { headers })
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'quota_exceeded' }),
        { status: 402, headers }
      )
    }
  },
}
