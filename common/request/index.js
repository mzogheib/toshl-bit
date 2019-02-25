// If no content returned on success response.json() will fail.
// Catch this failure and send through the status in its place.
const processResponse = response =>
  response
    .json()
    .then(data => ({ status: response.status, response: data }))
    .catch(() => ({ status: 204 }));

// Fetch only rejects failed network requests. Force a reject for common errors.
const isError = status => status >= 400;
const rejectErrors = response =>
  isError(response.status) ? Promise.reject(response) : response;

const post = ({ url, data, headers }) => {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers,
  };
  return fetch(url, options)
    .then(processResponse)
    .then(rejectErrors);
};

export default {
  post,
};
