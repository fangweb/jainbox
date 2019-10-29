export class HttpClient {
  static async send(request) {
    const response = await fetch(request);

    if (!response.ok && response.type) {
      throw new Error(response.statusText);
    }

    const text = await response.text();

    return text ? JSON.parse(text) : {};
  }

  static get(headers, endpoint) {
    const request = new Request(endpoint, {
      body: null,
      headers,
      method: 'GET',
      mode: 'cors'
    });

    return HttpClient.send(request);
  }

  static post(headers, endpoint, body) {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'POST',
      mode: 'cors'
    });

    return HttpClient.send(request);
  }

  static put(headers, endpoint, body) {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'PUT',
      mode: 'cors'
    });

    return HttpClient.send(request);
  }

  static delete(headers, endpoint, body) {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'DELETE',
      mode: 'cors'
    });

    return HttpClient.send(request);
  }
}
