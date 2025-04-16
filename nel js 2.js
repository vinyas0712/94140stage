self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Simulate a network error on this path
  if (url.pathname.includes('/simulate-network-error')) {
    event.respondWith(
      new Promise((_, reject) => {
        setTimeout(() => reject(new TypeError('Simulated network error')), 100);
      })
    );

    // Log to your endpoint
    fetch('https://r.3gl.net/hawklogserver/94140/re.p', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'network-error',
        url: event.request.url,
        timestamp: Date.now()
      })
    }).catch(e => console.warn('Logging failed:', e));

    return;
  }

  // Default behavior
  event.respondWith(fetch(event.request));
});
