import React, { useState, useEffect } from "react";

/**
 * WatchInfo
 * - Fetches TMDB "watch/providers" for a given movie/tv object.
 * - Expects `movie` prop to contain at minimum: { id, media_type? }.
 */
export default function WatchInfo({ movie }) {
  const [providers, setProviders] = useState(null);
  const [error, setError] = useState(null);

  // Prefer environment variable; fall back to empty string and warn.
  const TMDB_KEY = process.env.REACT_APP_TMDB_KEY || "";

  useEffect(() => {
    if (!movie || !movie.id) {
      setProviders(null);
      return;
    }

    if (!TMDB_KEY) {
      console.warn(
        "TMDB API key missing. Set REACT_APP_TMDB_KEY in your environment."
      );
      setError("API key missing");
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    // Determine the media type for the endpoint:
    // - prefer movie.media_type when present (e.g., "movie" or "tv")
    // - otherwise default to "movie"
    const mediaType = movie.media_type || "movie";

    const url = `https://api.themoviedb.org/3/${mediaType}/${movie.id}/watch/providers?api_key=${TMDB_KEY}&language=en-US`;

    let didCancel = false;
    async function fetchProviders() {
      setError(null);
      try {
        const res = await fetch(url, { signal });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        if (!didCancel) setProviders(data);
      } catch (err) {
        if (err.name === "AbortError") {
          // ignore aborts
          return;
        }
        console.warn("Failed to load watch providers:", err);
        if (!didCancel) {
          setError("Failed to load providers");
          setProviders(null);
        }
      }
    }

    fetchProviders();

    return () => {
      didCancel = true;
      controller.abort();
    };
  }, [movie && movie.id, movie && movie.media_type, TMDB_KEY]);

  function renderProviderSection(title, items) {
    if (items && items.length > 0) {
      return items.map((p) => {
        const logo = p.logo_path ? `https://image.tmdb.org/t/p/w200/${p.logo_path}` : "";
        const providerName = p.provider_name || "Provider";
        return (
          <div
            key={p.provider_id}
            style={{ display: "inline-block", width: "80px", height: "80px", marginRight: "10px", marginBottom: "4px" }}
          >
            {logo ? (
              <img
                alt={providerName}
                src={logo}
                title={providerName}
                style={{ width: "100%", height: "100%", marginBottom: "3px", objectFit: "contain" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f2f2f2",
                  color: "#333",
                  fontSize: "12px",
                  padding: "4px",
                  textAlign: "center",
                }}
                title={providerName}
              >
                {providerName}
              </div>
            )}
          </div>
        );
      });
    }
    return <span>N/A</span>;
  }

  const us = providers?.results?.US;
  const buy = Array.isArray(us?.buy) ? us.buy : [];
  const stream = Array.isArray(us?.flatrate) ? us.flatrate : [];

  return (
    <div className="row">
      <div
        className="col-sm-12"
        style={{ padding: "10px 10px 24px 10px", border: "1px solid #85a5de", marginTop: "10px", borderRadius: "5px" }}
      >
        <h3>Where Can I Watch It?</h3>

        <h5 style={{ backgroundColor: "rgb(109, 142, 170)", padding: "5px", color: "white" }}>Buy/Rent</h5>
        {providers === null && !error ? <div>Loading...</div> : renderProviderSection("Buy/Rent", buy)}

        <h5 style={{ backgroundColor: "rgb(109, 142, 170)", padding: "5px", color: "white", marginTop: "20px" }}>
          Streaming
        </h5>
        {providers === null && !error ? <div>Loading...</div> : renderProviderSection("Streaming", stream)}

        {error ? <div style={{ color: "red", marginTop: 8 }}>{error}</div> : null}
      </div>
    </div>
  );
}