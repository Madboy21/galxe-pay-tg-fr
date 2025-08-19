import { useEffect, useState } from "react";

export default function AdModal({ open, onClose, onAfterTimer }) {
  if (!open) return null;
  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>Watch Ad</h3>
        <iframe title="ad" src="/monetag.html" style={{ width: "100%", height: 300, border: "1px solid #eee", borderRadius: 8 }} />
        <p className="small">Close after the ad finishes. A short timer will appear to claim.</p>
        <Countdown seconds={15} onDone={onAfterTimer} />
        <div style={{ textAlign:"right", marginTop: 8 }}>
          <button className="input" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function Countdown({ seconds=15, onDone }) {
  const [left, setLeft] = useState(seconds);
  useEffect(()=>{
    const t = setInterval(()=> setLeft(v => (v>0? v-1 : 0)), 1000);
    return ()=>clearInterval(t);
  },[]);
  return (
    <div className="center">
      {left>0 ? <p>Claim available in {left}s…</p> : <button className="btn" onClick={onDone}>Claim Reward</button>}
    </div>
  );
}
