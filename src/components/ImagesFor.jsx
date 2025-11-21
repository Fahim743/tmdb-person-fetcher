import React, { useEffect, useState } from 'react';



export default function ImagesFor({ id, apiKey }) {
const [profiles, setProfiles] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);


useEffect(() => {
if (!id) return;
let cancelled = false;
async function fetchImages() {
setLoading(true);
setError(null);
try {
const url = `https://api.themoviedb.org/3/person/${id}/images?api_key=${apiKey}`;
const res = await fetch(url);
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();
if (!cancelled) setProfiles(data.profiles || []);
} catch (err) {
console.error(err);
if (!cancelled) setError(err.message || 'Unknown error');
} finally {
if (!cancelled) setLoading(false);
}
}


fetchImages();
return () => { cancelled = true; };
}, [id, apiKey]);


if (loading) return <div className="images-loading">Loading images...</div>;
if (error) return <div className="images-error">Error: {error}</div>;
if (!profiles || profiles.length === 0) return <div className="images-none">No profile images found.</div>;


return (
<div className="images-grid">
{profiles.map((p, i) => (
<img key={i} src={`https://image.tmdb.org/t/p/w185${p.file_path}`} alt={`profile-${i}`} className="images-thumb" />
))}
</div>
);
}