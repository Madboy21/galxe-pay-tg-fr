import { useState } from "react";
import AdModal from "../components/AdModal";
import { Api } from "../api";

export default function Ads({ userId, user, setUser }) {
  const [open, setOpen] = useState(false);
  const canWatch = (user?.adsWatchedToday ?? 0) < 25;

  async function claimAfterAd() {
    try {
      await Api.adWatched(userId);
      setUser(u => ({ ...u, balance: (u.balance||0) + 0.5, adsWatchedToday: (u.adsWatchedToday||0) + 1 }));
      alert(`+0.5 G added!`);
    } catch (e) {
      alert(e.message);
    } finally {
      setOpen(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Watch Ads</h2>
        <p className="small">Up to 25 ads/day. Each ad = 0.5 G.</p>
        <button className="btn" disabled={!canWatch} onClick={()=>setOpen(true)}>
          {canWatch ? "Watch Ad" : "Daily limit reached"}
        </button>
      </div>
      <AdModal open={open} onClose={()=>setOpen(false)} onAfterTimer={claimAfterAd} />
    </div>
  );
}
