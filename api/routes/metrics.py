from fastapi import APIRouter
import os, time, requests, redis, json

router = APIRouter(prefix="/metrics", tags=["metrics"])

REDIS = redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379/0"), decode_responses=True)

def _cache_get(key): 
    raw = REDIS.get(key)
    return json.loads(raw) if raw else None

def _cache_set(key, obj, ttl=300): 
    REDIS.setex(key, ttl, json.dumps(obj))

@router.get("/feargreed")
def fear_greed():
    key = "fg:latest"
    if (cached := _cache_get(key)): return cached
    # Example source: alternative.me Fear & Greed Index (JSON)
    r = requests.get("https://api.alternative.me/fng/?limit=1", timeout=5)
    r.raise_for_status()
    data = r.json()["data"][0]
    payload = {"value": int(data["value"]), "classification": data["value_classification"], "ts": int(time.time()*1000)}
    _cache_set(key, payload, 300)
    return payload

@router.get("/altseason")
def altseason():
    key = "altseason:latest"
    if (cached := _cache_get(key)): return cached
    # Example source placeholder (replace with your provider or your own calc)
    # payload = { "value": 39, "note": "Bitcoin > Altcoins", "ts": int(time.time()*1000) }
    r = requests.get("https://www.blockchaincenter.net/api/altcoin-season-index/", timeout=5)
    r.raise_for_status()
    v = r.json().get("season", 39)  # adapt to real schema
    payload = {"value": int(v), "note": "Altcoin Season" if v>=75 else ("Bitcoin Season" if v<=25 else "Neutral"), "ts": int(time.time()*1000)}
    _cache_set(key, payload, 300)
    return payload

@router.get("/totalcaps")
def total_caps():
    key = "totalcaps:latest"
    if (cached := _cache_get(key)): return cached
    # Example: CoinGecko global (replace as needed; or TradingView proxy)
    r = requests.get("https://api.coingecko.com/api/v3/global", timeout=5)
    r.raise_for_status()
    g = r.json().get("data", {})
    payload = {
        "total": g.get("total_market_cap", {}).get("usd"),
        "btc_dominance": g.get("market_cap_percentage", {}).get("btc"),
        "eth_dominance": g.get("market_cap_percentage", {}).get("eth"),
        "ts": int(time.time()*1000)
    }
    _cache_set(key, payload, 300)
    return payload