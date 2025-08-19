const BASE = import.meta.env.VITE_API_BASE; // e.g. https://your-backend.vercel.app

async function jfetch(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) throw new Error(data.error || "Request failed");
  return data;
}

export const Api = {
  init: (payload) => jfetch("/init", { method: "POST", body: JSON.stringify(payload) }),
  adWatched: (userId) => jfetch("/adWatched", { method: "POST", body: JSON.stringify({ userId }) }),
  withdraw: (userId, amount, evmAddress) =>
    jfetch("/withdraw", { method: "POST", body: JSON.stringify({ userId, amount, evmAddress }) }),
  myWithdrawals: (userId) => jfetch(`/myWithdrawals?userId=${userId}`, { method: "GET" }),
  adminListWithdrawals: (secret, status = "pending") =>
    jfetch(`/admin/withdrawals?status=${status}`, { headers: { "x-admin-secret": secret } }),
  adminSetStatus: (secret, id, status) =>
    jfetch(`/admin/withdrawals/${id}/status`, {
      method: "POST",
      headers: { "x-admin-secret": secret },
      body: JSON.stringify({ status })
    })
};
