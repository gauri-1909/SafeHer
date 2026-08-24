import { useState } from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';
import apiClient from '../api/apiClient';

function mapLink(lat, lng) {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

export default function SOSButton({ onTriggered }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastLocation, setLastLocation] = useState(null); // { lat, lng, triggeredAt }

  const handleClick = () => {
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await apiClient.post('/sos', { lat: latitude, lng: longitude });
          setLastLocation({
            lat: latitude,
            lng: longitude,
            triggeredAt: res.data.event.triggeredAt
          });
          onTriggered(res.data.event);
        } catch (err) {
          setError('Could not log the SOS event. Please try again.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Location permission denied — enable it to use SOS.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0 // never use a cached/stale position — always get a fresh fix
      }
    );
  };

  return (
    <div className="flex flex-col items-center mb-9">
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-[190px] h-[190px] rounded-full border-[3px] border-sos-ring
                   bg-[radial-gradient(circle_at_50%_40%,var(--color-sos-bg-start),var(--color-sos-bg-end))]
                   text-sos-text flex flex-col items-center justify-center gap-2
                   transition-transform hover:not-disabled:scale-[1.03]
                   hover:not-disabled:shadow-[0_8px_24px_rgba(176,55,74,0.18)]
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <AlertTriangle size={30} strokeWidth={2} />
        <span className="text-lg font-bold tracking-wide">SOS</span>
      </button>

      <p className="mt-3.5 text-sm font-medium text-sos-text">
        {loading ? 'Sharing your location...' : 'Tap to trigger and share your location'}
      </p>

      {error && <p className="mt-2.5 text-[13px] text-danger text-center">{error}</p>}

      {lastLocation && !loading && (
        <div className="mt-3 flex items-center gap-2 text-[12.5px] text-text-muted">
          <MapPin size={13} className="text-sos-text shrink-0" />
          <span>
            Last captured: {lastLocation.lat.toFixed(4)}, {lastLocation.lng.toFixed(4)}
          </span>
          <a
            href={mapLink(lastLocation.lat, lastLocation.lng)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-navbar-end font-semibold underline"
          >
            View on map
          </a>
        </div>
      )}
    </div>
  );
}