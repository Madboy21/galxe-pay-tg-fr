export default function Dashboard({ user }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col"><div className="card">
          <h2>Balance</h2>
          <p style={{ fontSize: 28, margin: 0 }}>{(user?.balance || 0).toFixed(2)} G</p>
          <p className="small">Minimum withdraw: 100 G</p>
        </div></div>
        <div className="col"><div className="card">
          <h2>Today</h2>
          <p style={{ fontSize: 28, margin: 0 }}>{user?.adsWatchedToday ?? 0} / 25</p>
          <p className="small">Per ad: 0.5 G</p>
        </div></div>
        <div className="col"><div className="card">
          <h2>Referral</h2>
          <p className="small">Referred users: {user?.referralCount ?? 0}</p>
        </div></div>
      </div>
    </div>
  );
}
