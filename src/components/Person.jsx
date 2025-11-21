import React from 'react';
import KnownForMovie from './KnownForMovie';
import ImagesFor from './ImagesFor';



export default function Person({ person, apiKey }) {
if (!person) return <div className="person-empty">No person selected</div>;


return (
<article className="person-card">
<div className="person-top">
{person.profile_path ? (
<img className="person-avatar" src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} alt={person.name} />
) : (
<div className="avatar-placeholder">No image</div>
)}


<div className="person-meta">
<h2 className="person-name">Name: {person.name}</h2>
<div className="person-dept">Known for Department: {person.known_for_department}</div>
<div className="person-pop">Popularity: {person.popularity}</div>
<div className="person-id">ID: {person.id}</div>
</div>
</div>


<div className="person-knownfor">
<h3>Known for</h3>
{person.known_for && person.known_for.length > 0 ? (
<div className="knownfor-list">
{person.known_for.map((kf, i) => (
<KnownForMovie key={i} movie={kf} />
))}
</div>
) : (
<div>No known-for entries.</div>
)}
</div>


<div className="person-images">
<h3>Profile images</h3>
<ImagesFor id={person.id} apiKey={apiKey} />
</div>
</article>
);
}