const API = "http://localhost:3001";

export const searchTags = () => {
  return fetch(`${API}/apiv1/tags`, {
    method: "GET",
    }).then(res => res.json())
    .then(res => res.results);
};

export const searchAdvert = (query) => {
  return fetch(`${API}/apiv1/anuncios`, {
    method: "GET"
  }).then(res => res.json())
    .then(res => res.results);
};

export const searchAdvertId = (_id) => {
  return fetch(`${API}/apiv1/anuncios/${_id}`, {
    method: "GET"
  }).then(res => res.json())
  .then(res => res.result);
};

export const findAdverts = (query) => {
    return fetch(`${API}/apiv1/anuncios${query}`, {
    method: "GET"
  }).then(res => res.json())
    .then(res => res.results);
};

export const createAdvert = (advert) => {
  return fetch(`${API}/apiv1/anuncios`, {
    method: "POST",
    body: advert,
    headers: {
      'Content-Type': 'application/json'
  }}).then(res => res.json())
    .then(res => res.results);
};

export const updateAdvert = (advert, _id) => {
  console.log(advert)
  return fetch(`${API}/apiv1/anuncios/${_id}`, {
    method: "PUT",
    body: JSON.stringify(advert),
    headers: {
      'Content-Type': 'application/json'
  }}).then(res => res.json())
    .then(res => res.results);
};