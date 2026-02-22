export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const upstream = await fetch('https://04-sign-sure-api.vercel.app/analyze', {
      method: 'POST',
      body: formData,
    });

    const contentType = upstream.headers.get('content-type') || 'application/json';
    const body = await upstream.text();

    return new Response(body, {
      status: upstream.status,
      headers: {
        'content-type': contentType,
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        detail: (error as Error).message || 'Upstream request failed',
      }),
      { status: 502, headers: { 'content-type': 'application/json' } }
    );
  }
}
