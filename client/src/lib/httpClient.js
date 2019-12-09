export class HttpClient {
  static async send(request) {
    const response = await fetch(request);
    if (!response.ok && response.type) {
      throw new Error(response.statusText);
    }

    return response;
  }

  static async get(headers, endpoint) {
    const request = new Request(endpoint, {
      body: null,
      headers,
      method: 'GET',
      mode: 'cors'
    });

    const response = await HttpClient.send(request);
    return response;
  }

  static async post(headers, endpoint, body) {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'POST',
      mode: 'cors'
    });

    const response = await HttpClient.send(request);
    return response;
  }

  static async put(headers, endpoint, body) {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'PUT',
      mode: 'cors'
    });

    const response = await HttpClient.send(request);
    return response;
  }

  static async delete(headers, endpoint, body) {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'DELETE',
      mode: 'cors'
    });

    const response = HttpClient.send(request);
    return response;
  }
}
