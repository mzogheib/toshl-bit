import base64 from "base-64";
import token from "../../private/toshl-token";
import Request from "../request";

const toshlApiUrl = "https://api.toshl.com/entries";
const auth = base64.encode(`${token}:`);
const headers = {
  Authorization: `Basic ${auth}`,
  "Content-Type": "application/json",
};

const createEntry = data => Request.post({ url: toshlApiUrl, data, headers });

export default {
  entries: {
    create: createEntry,
  },
};
