import React from 'react';



export default function KnownForMovie({ movie }) {
const title = movie.title || movie.name || 'Untitled';
const date = movie.release_date || movie.first_air_date || 'Unknown';


return (
<div className="kf-item">
<div className="kf-poster">
{movie.poster_path ? (
<img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={title} />
) : (
<div className="poster-placeholder">No poster</div>
)}
</div>


<div className="kf-info">
<h4 className="kf-title">{title}</h4>
<div className="kf-date">{date}</div>
<p className="kf-overview">{movie.overview || 'No overview available.'}</p>
</div>
</div>
);
}