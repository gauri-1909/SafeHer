import { AlertTriangle, X, MapPin } from 'lucide-react';

function mapLink(lat, lng) {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

function timeAgo(isoString) {
  const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export default function AlertBanner({ alerts, onDismiss }) {
  if (alerts.length === 0) return null;

  return (
    <div className="max-w-[720px] mx-auto w-full px-5 pt-6 flex flex-col gap-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="flex items-center justify-between bg-active-bg border border-sos-ring rounded-xl px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle size={18} className="text-active-text shrink-0" />
            <div>
              <p className="text-sm font-semibold text-active-text">
                {alert.triggeredBy?.name || 'Someone'} triggered an SOS · {timeAgo(alert.triggeredAt)}
              </p>
              <div className="flex items-center gap-1.5 text-[12px] text-text-muted mt-0.5">
                <MapPin size={12} className="shrink-0" />
                <span>
                  {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                </span>
                <a
                  href={mapLink(alert.location.lat, alert.location.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navbar-end font-semibold underline"
                >
                  View on map
                </a>
              </div>
            </div>
          </div>
          <button
            onClick={() => onDismiss(alert.id)}
            aria-label="Dismiss alert"
            className="text-text-muted hover:text-text-primary p-1 transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}