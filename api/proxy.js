export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.searchParams.get('path') || '';
  
  const targetUrl = `https://test-assignment.emphasoft.com/api/v1/${path}`;
  
  const queryParams = new URLSearchParams();
  Object.keys(req.query).forEach(key => {
    if (key !== 'path') {
      queryParams.append(key, req.query[key]);
    }
  });
  
  const queryString = queryParams.toString();
  const fullUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;
  
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }
    
    const fetchOptions = {
      method: req.method,
      headers,
    };
    
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      fetchOptions.body = typeof req.body === 'string' 
        ? req.body 
        : JSON.stringify(req.body);
    }
    
    const response = await fetch(fullUrl, fetchOptions);
    
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
