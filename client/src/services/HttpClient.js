export class HttpClient {

  static async request(request) { 
    const response = await fetch(request);
    
    if(!response.ok && response.type) {
      throw new Error(response.statusText);
    }
    
    const text = await response.text();
    
    return text ? JSON.parse(text): {};
    
  }
  
  get(endpoint) {
    const request = new Request(endpoint, {
      body: null,
      headers,
      method: 'GET',
      mode: 'cors'
    });
    
    return HttpClient.request(request);
  }

  post(endpoint, body) {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'POST',
      mode: 'cors'
    });
    
    return HttpClient.request(request);
  }

  put(endpoint, body) {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'PUT',
      mode: 'cors'
    });
    
    return HttpClient.request(request);
  }

  delete(endpoint, body) {
    const request = new Request(endpoint, {
      body: JSON.stringify(body),
      headers,
      method: 'DELETE',
      mode: 'cors'
    });
    
    return HttpClient.request(request);    
  }

}
