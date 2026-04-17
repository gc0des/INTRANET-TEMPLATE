import { useState } from "react";
import AppView from "./views/AppView";
import { LoginGate } from "./auth/components/LoginGate";

export default function AppShell() {
  const [authUser, setAuthUser] = useState(null);

  if (!authUser) {
    return <LoginGate onAuthenticated={setAuthUser} />;
  }

  return <AppView authUser={authUser} onSignOut={() => setAuthUser(null)} />;
}
