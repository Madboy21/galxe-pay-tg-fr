import { useEffect, useState } from "react";
import { Api } from "../api";

export default function Admin() {
  const [secret, setSecret] = useState(localStorage.getItem("admin_secret") || "");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("pending");

  async function load() {
    try { const res = await Api.adminListWithdrawals(secret, status); setItems(res.items || []); }
    catch (e) { alert(e.message); }
  }
  useEffect(()=>{ if (secret) load(); }, [secret, status]);

  if (!secret) {
    return (
      <div className="container">
        <div className="card" style={{ maxWidth:420 }}>
          <h3>Admin Login</h3>
          <input className="input" placeholder="Admin Secret" value={secret} onChange={e=>setSecret(e.target.value)} />
          <div style={{height:8}}/>
          <button className="btn" onClick={()=>localStorage.setItem("admin_secret", secret)}>Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Withdrawals</h2>
        <div className="row">
          <div className="col" style={{maxWidth:220}}>
            <select className="select" value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="col" style={{maxWidth:120}}>
            <button className="btn" onClick={load}>Reload</button>
          </div>
        </div>
        <table className="table" style={{marginTop:10}}>
          <thead><tr><th>ID</th><th>User</th><th>Amount</th><th>Address</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {items.map(x=>(
              <tr key={x.id}>
                <td className="small">{x.id.slice(0,8)}…</td>
                <td>{x.userId}</td>
                <td>{x.amount}</td>
                <td className="small">{x.evmAddress}</td>
                <td>{x.status}</td>
                <td>
                  {x.status==="pending" && <>
                    <button className="btn" onClick={async ()=>{ await Api.adminSetStatus(secret, x.id, "approved"); load(); }}>Approve</button>
                    &nbsp;
                    <button className="input" onClick={async ()=>{ await Api.adminSetStatus(secret, x.id, "rejected"); load(); }}>Reject</button>
                  </>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="small">Approve করার পর পেমেন্ট তুমি manually করবে।</p>
      </div>
    </div>
  );
}
