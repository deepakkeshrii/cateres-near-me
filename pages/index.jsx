import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Catering Search</title>
      </Head>

      <nav className="navbar navbar-light bg-white border-bottom">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold">
            Catering Search
          </Link>
          <Link href="/caterers" className="btn btn-sm btn-primary">
            Browse Caterers
          </Link>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 mx-auto text-center">
            <h1 className="mb-3">Find caterers for your event</h1>
            <p className="text-muted mb-4">
              Search and compare caterers by name, cuisine and price per plate.
              Pick the one that fits your budget.
            </p>
            <Link href="/caterers" className="btn btn-primary px-4">
              View all caterers
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
