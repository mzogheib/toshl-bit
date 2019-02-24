import base64 from "base-64";
import token from "../../private/toshl-token";

const post = (url = ``, data = {}) => {
  const auth = base64.encode(`${token}:`);
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
  };
  return (
    fetch(url, options)
      // Toshl BE does not return any content on success so response.json() will fail.
      // Catch this failure and send through an empty object in its place.
      .then(response => response.json().catch(() => ({})))
      // Fetch only rejects failed network requests. Force a reject for responses such
      // as 401, 404 etc
      .then(response =>
        response.error_id ? Promise.reject(response) : response
      )
  );
};

const createEntry = data => post("https://api.toshl.com/entries", data);

export default {
  entries: {
    create: createEntry,
  },
};
