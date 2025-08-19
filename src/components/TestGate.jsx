import { useEffect, useState } from "react";
import { Api } from "../api";
import { getTelegramUser } from "../utils/telegram";

export default function TestGate({ onReady }) {
  const [uid, setUid] = useState(localStorage.getItem("test_uid") || "");
  const [ref, setRef] = useState(localStorage.getItem("test_ref") || "");
  const [loading, setLoading] = useState(false);
  const tgInfo = getTelegramUser();

  useEffect(() => {
    (async () => {
      if (tgInfo.inTelegram) {
        setLoading(true);
        try {
          const res = await Api.init({ initData: tgInfo.initData, referrerId: tgInfo.referrerId });
          onReady({ userId: res.userId, user: res.user });
        } catch (e) { alert(e.message); }
        setLoading(false);
      }
    })();
  }, []);

  if (tgInfo.inTelegram) return <div className="card"><p>Loading Telegram user...</p></div>;

  return (
    <div className="card" style={{ maxWidth: 420, margin: "40px auto" }}>
      <h3>Local/Test mode</h3>
      <p className="small">No Telegram WebApp detected. Enter your test UID and press Load.</p>
      <input className="input" placeholder="telegram id (e.g., 12345)" value={uid} onChange={e=>setUid(e.target.value)} />
      <div style={{ height: 8 }} />
      <input className="input" placeholder="referrer id (optional)" value={ref} onChange={e=>setRef(e.target.value)} />
      <div style={{ display:"flex", gap: 10, marginTop: 12 }}>
        <button className="btn" disabled={loading || !uid} onClick={async ()=>{
          setLoading(true);
          try {
            const res = await Api.init({ testUserId: uid, referrerId: ref || null });
            localStorage.setItem("test_uid", uid);
            localStorage.setItem("test_ref", ref);
            onReady({ userId: res.userId, user: res.user });
          } catch (e) { alert(e.message); }
          setLoading(false);
        }}>Load Profile</button>
        <button className="input" onClick={()=>{ setUid(""); setRef(""); localStorage.clear(); }}>Reload</button>
      </div>
    </div>
  );
}
