import { useEffect, useState } from "react";
import { Api } from "../api";

export default function Withdraw({ userId, user, setUser }) {
  const [amount, setAmount] = useState("");
  const [addr, setAddr] = useState("");
  const [list, setList] = useState([]);

  async function load() {
    try { const res = await Api.myWithdrawals(userId); setList(res.items || []); } catch {}
  }
  useEffect(()=>{ load(); }, []);

  async function submit() {
    try {
      const a = Number(amount);
      if (!addr || !/^0x[a-fA-F0-9]{40}$/.test(addr)) return alert("Enter valid EVM address");
      await Api.withdraw(userId, a, addr);
      alert("Withdraw requested!");
      setUser(u => ({ ...u, balance: (u.balance||0) - a }));
      setAmount(""); setAddr("");
      load();
    } catch (e) { alert(e.message); }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Withdraw</h2>
        <div className="row">
          <div className="col">
            <label>Amount (min 100 G)</label>
            <input className="input" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="e.g., 120" />
          </div>
          <div className="col">
            <label>EVM Address</label>
            <input className="input" value={addr} onChange={e=>setAddr(e.target.value)} placeholder="0x..." />
          </div>
        </div>
        <div style={{height:10}} />
        <button className="btn" onClick={submit}>Request Withdraw</button>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>My Requests</h3>
        <table className="table">
          <thead><tr><th>ID</th><th>Amount</th><th>Address</th><th>Status</th><th>Time</th></tr></thead>
          <tbody>
            {list.map(x=>(
              <tr key={x.id}>
                <td className="small">{x.id.slice(0,6)}…</td>
                <td>{x.amount}</td>
                <td className="small">{x.evmAddress}</td>
                <td>{x.status}</td>
                <td className="small">{x.createdAt?.seconds ? new Date(x.createdAt.seconds*1000).toLocaleString() : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
