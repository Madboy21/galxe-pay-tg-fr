import { NavLink } from "react-router-dom";

export default function Header({ userId, balance, todayCount }) {
  return (
    <div className="header">
      <div className="inner">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/ads">Watch Ads</NavLink>
        <NavLink to="/ref">Referral</NavLink>
        <NavLink to="/withdraw">Withdraw</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        <div style={{ marginLeft: "auto" }} className="small">
          UID: <span className="badge">{userId || "—"}</span> &nbsp;
          Balance: <span className="badge">{balance?.toFixed(2) ?? "0.00"} G</span> &nbsp;
          Today: <span className="badge">{todayCount ?? 0}/25</span>
        </div>
      </div>
    </div>
  );
}
