import React from "react";
import { createRoot } from 'react-dom/client';
import App from './App';
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <CurrentUserProvider>
    <ProfileDataProvider>
      <App />
    </ProfileDataProvider>
  </CurrentUserProvider>
);