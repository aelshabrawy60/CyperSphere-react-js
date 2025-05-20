import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App"; // Assuming App.jsx or App.js
import {
  UIKitSettingsBuilder,
  CometChatUIKit,
} from "@cometchat/chat-uikit-react";
import { setupLocalization } from "./CometChat/utils/utils"; // utils.js
import { BuilderSettingsProvider } from "./CometChat/context/BuilderSettingsContext"; // context.jsx or .js

export const COMETCHAT_CONSTANTS = {
  APP_ID: "2758011d47ee4dcb",    // Replace with your App ID
  REGION: "eu",    // Replace with your App Region
  AUTH_KEY: "2ce79be40b31882dd334dbc1e0c155fa48641469",  // Replace with your Auth Key
};

const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();

CometChatUIKit.init(uiKitSettings).then(() => {
  setupLocalization();
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(
      <BuilderSettingsProvider>
        <App />
      </BuilderSettingsProvider>
    );
  }
});
