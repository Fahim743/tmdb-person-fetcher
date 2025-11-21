//49a9dc320429b6ee8e9fb5d726963b5a

import React, { useEffect, useState } from 'react';
import Person from './components/Person.jsx';
import './styles/App.css';

const DEFAULT_QUERY = 'spielberg'; 

export default function App() {
  const [persons, setPersons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const [queryInput, setQueryInput] = useState(DEFAULT_QUERY);
  const [lastQuery, setLastQuery] = useState('');

  const API_KEY = '49a9dc320429b6ee8e9fb5d726963b5a';

  useEffect(() => {
    fetchPersons(DEFAULT_QUERY);
  }, []);

  async function fetchPersons(q) {
    if (!q || q.trim() === '') return;
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(q)}&api_key=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log('search person data', data);
      setPersons(data.results || []);
      setCurrentIndex(0);
      setLastQuery(q);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  function onSubmitSearch(e) {
    e.preventDefault();
    fetchPersons(queryInput);
  }

  function goPrev() {
    setCurrentIndex(i => Math.max(0, i - 1));
  }
  function goNext() {
    setCurrentIndex(i => Math.min(persons.length - 1, i + 1));
  }
  function jumpTo(i) {
    setCurrentIndex(i);
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>TMDB Person Fetcher</h1>

        <form className="search-form" onSubmit={onSubmitSearch}>
          <input
            type="search"
            value={queryInput}
            placeholder={`Search people (e.g. ${DEFAULT_QUERY})`}
            onChange={e => setQueryInput(e.target.value)}
            aria-label="Search people"
          />
          <button type="submit">Search</button>
          <button type="button" onClick={() => { setQueryInput(''); setPersons([]); setLastQuery(''); }}>Clear</button>
        </form>

        <div className="app-meta">Results: <strong>{persons.length}</strong>{lastQuery && <span> — last search: <em>{lastQuery}</em></span>}</div>
      </header>

      <main className="app-main">
        {loading && <div className="notice">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && persons.length === 0 && !error && (
          <div className="notice">No results. Enter a query above and press Search.</div>
        )}

        {!loading && persons.length > 0 && (
          <>
            <nav className="nav">
              <button onClick={() => jumpTo(0)} disabled={currentIndex === 0}>First</button>
              <button onClick={goPrev} disabled={currentIndex === 0}>Prev</button>

              <div className="index-buttons">
                {renderPagination(persons.length, currentIndex, jumpTo)}
              </div>

              <button onClick={goNext} disabled={currentIndex === persons.length - 1}>Next</button>
              <button onClick={() => jumpTo(persons.length - 1)} disabled={currentIndex === persons.length - 1}>Last</button>
            </nav>

            <section className="person-view">
              <Person person={persons[currentIndex]} apiKey={API_KEY} />
            </section>

            <footer className="app-footer">Showing {currentIndex + 1} of {persons.length}</footer>
          </>
        )}
      </main>
    </div>
  );
}

function renderPagination(total, current, onJump) {
  const elems = [];
  if (total <= 9) {
    for (let i = 0; i < total; i++) {
      elems.push(
        <button key={i} onClick={() => onJump(i)} disabled={i === current}>{i + 1}</button>
      );
    }
    return elems;
  }

  elems.push(<button key={0} onClick={() => onJump(0)} disabled={0 === current}>1</button>);
  if (current > 3) elems.push(<span key="l-ell">· · ·</span>);

  const start = Math.max(1, current - 2);
  const end = Math.min(total - 2, current + 2);
  for (let i = start; i <= end; i++) elems.push(<button key={i} onClick={() => onJump(i)} disabled={i === current}>{i + 1}</button>);

  if (current < total - 4) elems.push(<span key="r-ell">· · ·</span>);
  elems.push(<button key={total - 1} onClick={() => onJump(total - 1)} disabled={total - 1 === current}>{total}</button>);
  return elems;
}