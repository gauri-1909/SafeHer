import { History, MapPin } from 'lucide-react';

function formatDate(isoString) {
  const date = new Date(isoString);
  return (
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ', ' +
    date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  );
}

function mapLink(lat, lng) {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

export default function SOSHistoryList({ events, onResolve }) {
  return (
    <div className="bg-white border border-card-border rounded-2xl p-5 shadow-[0_2px_10px_rgba(90,30,70,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <span className="flex items-center gap-2 text-[15px] font-bold text-text-primary">
          <History size={16} />
          SOS history
        </span>
      </div>

      {events.length === 0 && (
        <p className="text-[13px] text-text-muted py-2">No SOS events yet.</p>
      )}

      {events.map((event) => (
        <div
          key={event._id}
          className="flex items-start justify-between py-3 border-b border-card-border last:border-b-0"
        >
          <div>
            <span className="text-sm font-semibold text-text-primary block">
              {formatDate(event.triggeredAt)}
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-[12px] text-text-muted">
              <MapPin size={12} className="shrink-0" />
              <span>
                {event.location.lat.toFixed(4)}, {event.location.lng.toFixed(4)}
              </span>
              <a
                href={mapLink(event.location.lat, event.location.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navbar-end font-semibold underline"
              >
                View on map
              </a>
            </div>
          </div>

          {event.status === 'resolved' ? (
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-resolved-bg text-resolved-text shrink-0">
              Resolved
            </span>
          ) : (
            <button
              onClick={() => onResolve(event._id)}
              title="Mark resolved"
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-active-bg text-active-text cursor-pointer shrink-0"
            >
              Active
            </button>
          )}
        </div>
      ))}
    </div>
  );
}