export default function Referral({ userId }) {
  const bot = import.meta.env.VITE_TG_BOT_USERNAME;
  const link = `https://t.me/${bot}?start=${userId}`;

  function copy(t) {
    navigator.clipboard.writeText(t);
    alert("Copied!");
  }
  return (
    <div className="container">
      <div className="card">
        <h2>Referral</h2>
        <p>Share your link. You earn <b>10%</b> of your friend’s earnings.</p>
        <div className="row">
          <div className="col"><input className="input" value={link} readOnly /></div>
          <div className="col" style={{ maxWidth: 160 }}>
            <button className="btn" onClick={()=>copy(link)}>Copy Link</button>
          </div>
        </div>
        <p className="small">Example: https://t.me/{bot}?start={userId}</p>
      </div>
    </div>
  );
}
