import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const API_URL = 'http://localhost:4000/api/caterers';

export default function Caterers() {
  const [caterers, setCaterers] = useState([]);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCaterers();
  }, [search, price]);

  function fetchCaterers() {
    setLoading(true);
    setError('');

    let url = API_URL + '?';
    if (search) url += 'search=' + encodeURIComponent(search) + '&';

    if (price === 'low') url += 'maxPrice=500';
    else if (price === 'mid') url += 'minPrice=500&maxPrice=1000';
    else if (price === 'high') url += 'minPrice=1000';

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then(data => {
        setCaterers(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load caterers. Is the API running on port 4000?');
        setLoading(false);
      });
  }

  return (
    <>
      <Head>
        <title>Caterers</title>
      </Head>

      <nav className="navbar navbar-light bg-white border-bottom">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold">
            Catering Search
          </Link>
          <Link href="/" className="btn btn-sm btn-outline-secondary">
            Home
          </Link>
        </div>
      </nav>

      <div className="container py-4">
        <h2 className="mb-3">Available Caterers</h2>

        <div className="row g-2 mb-4">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search by caterer name"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={price}
              onChange={e => setPrice(e.target.value)}
            >
              <option value="">All price ranges</option>
              <option value="low">Below Rs. 500</option>
              <option value="mid">Rs. 500 - 1000</option>
              <option value="high">Above Rs. 1000</option>
            </select>
          </div>
        </div>

        {loading && <p className="text-muted">Loading...</p>}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && caterers.length === 0 && (
          <p className="text-muted">No caterers found.</p>
        )}

        <div className="row">
          {caterers.map(c => (
            <div className="col-md-6 col-lg-4 mb-3" key={c.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{c.name}</h5>
                    <span className="badge bg-success">{c.rating}</span>
                  </div>
                  <p className="text-muted mb-2">{c.location}</p>
                  <p className="mb-2">
                    <strong>Rs. {c.pricePerPlate}</strong> per plate
                  </p>
                  <div>
                    {c.cuisines.map(cuisine => (
                      <span key={cuisine} className="badge bg-light text-dark border me-1">
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
