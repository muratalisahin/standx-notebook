export default async function handler(req, res) {
  try {
    const r = await fetch("https://perps.standx.com/api/query_market_overview", {
      headers: { accept: "application/json" },
    });
    const text = await r.text();
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.setHeader("cache-control", "s-maxage=4, stale-while-revalidate=12");
    res.status(r.status).send(text);
  } catch (e) {
    res.status(502).json({ error: "StandX proxy failed", detail: String(e.message || e) });
  }
}
