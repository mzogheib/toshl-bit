import * as messaging from "messaging";
import { vibration } from "haptics";

const VIBRATION_MAP = {
  SUCCESS: "confirmation-max",
  ERROR: "nudge-max",
};

// Better to subscribe to these events from modules that consume this service
messaging.peerSocket.onopen = () => console.log("App ready to send messages.");

messaging.peerSocket.onerror = err =>
  console.log("Connection error: " + err.code + " - " + err.message);

messaging.peerSocket.onmessage = ({ data }) =>
  vibration.start(VIBRATION_MAP[data.status]);

const send = data => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
};

export default {
  send,
};
