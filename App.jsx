import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import TestGate from "./components/TestGate";
import Dashboard from "./pages/Dashboard";
import Ads from "./pages/Ads";
import Referral from "./pages/Referral";
import Withdraw from "./pages/Withdraw";
import Admin from "./pages/Admin";
import "./styles.css";

export default function App() {
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  if (!ready) {
    return (
      <div className="container">
        <TestGate onReady={({ userId, user }) => { setUserId(userId); setUser(user); setReady(true); }} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header userId={userId} balance={user?.balance} todayCount={user?.adsWatchedToday} />
      <Routes>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/ads" element={<Ads userId={userId} user={user} setUser={setUser} />} />
        <Route path="/ref" element={<Referral userId={userId} />} />
        <Route path="/withdraw" element={<Withdraw userId={userId} user={user} setUser={setUser} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
