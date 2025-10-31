import { useState, useEffect, useMemo } from 'react';
import { fetchTripCards } from './api/tripcards';
import TripCard from './components/TripCard/TripCard';
import ToggleSwitch from './components/Ui/ToggleSwitch/ToggleSwitch';
import SearchBar from './components/Ui/SearchBar/SearchBar';
import Modal from './components/Ui/Modal/Modal';
import './App.css';

function App() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortByRating, setSortByRating] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    fetchTripCards()
      .then(setTrips)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const norm = (s) => (s || "").toString().toLowerCase().trim();
  const visibleTrips = useMemo(() => {
    const q = norm(query);
    const arr = [...trips];
    if (sortByRating) arr.sort((a,b)=>(b.rating??0)-(a.rating??0));
    if (q) {
      arr.sort((a,b)=>{
        const am = norm(a.name).includes(q) || norm(a.description).includes(q);
        const bm = norm(b.name).includes(q) || norm(b.description).includes(q);
        return Number(bm) - Number(am);
      });
    }
    return arr;
  }, [trips, query, sortByRating]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading trips</p>;

  return (
    <main className="page">
      <header className="toolbar">
        <div className="toolbar__logo">
          <span className="logo__main">Trip</span>
          <span className="logo__accent">Hub</span>
        </div>

        <div className="toolbar__controls">
          <SearchBar value={query} onChange={setQuery} placeholder="Search trips..." />
          <ToggleSwitch
            checked={sortByRating}
            onChange={setSortByRating}
            label="Sort by Rating"
          />
        </div>
      </header>

      <div className="trip-grid">
        {visibleTrips.map((trip, i) => (
          <TripCard
            key={trip.id}
            trip={trip}
            index={i}
            onMoreInfo={(t) => setSelectedTrip(t)}
            dimmed={!!query && !(norm(trip.name).includes(norm(query)) || norm(trip.description).includes(norm(query)))}
          />
        ))}
      </div>

      <Modal
        open={!!selectedTrip}
        onClose={() => setSelectedTrip(null)}
        title={selectedTrip?.name || "Details"}
      >
        {selectedTrip && (
          <div className="trip-details">
            <img
              src={selectedTrip.image}
              alt={selectedTrip.name}
              style={{width:'100%',borderRadius:'12px',marginBottom:'1rem'}}
            />
            <p>{selectedTrip.long_description}</p>
            <div>
              <strong>Rating:</strong>{" "}
              {"★".repeat(selectedTrip.rating)}{"☆".repeat(5 - selectedTrip.rating)}
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}

export default App;

