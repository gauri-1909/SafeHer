import { useState, useEffect, useCallback } from 'react';
import { Link2, X, Copy, Check, ChevronDown, MapPin, AlertTriangle } from 'lucide-react';
import apiClient from '../api/apiClient';

function initials(name) {
  return name ? name.trim().charAt(0).toUpperCase() : '?';
}

function mapLink(lat, lng) {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return (
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ', ' +
    date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  );
}

function useCountdown(expiresAt) {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    if (!expiresAt) {
      setRemaining(null);
      return;
    }
    const tick = () => {
      const diff = Math.max(0, new Date(expiresAt).getTime() - Date.now());
      setRemaining(diff);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  if (remaining === null) return null;
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Shows a linked person's SOS history — read-only. Only the account owner
// can mark their own events resolved, so no resolve action here.
function LinkedUserSOSPanel({ userId }) {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setEvents(null);
    setError('');

    apiClient
      .get(`/sos/linked/${userId}`)
      .then((res) => {
        if (!cancelled) setEvents(res.data.events);
      })
      .catch(() => {
        if (!cancelled) setError('Could not load their SOS history.');
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (error) {
    return <p className="text-[12.5px] text-danger px-1 py-2">{error}</p>;
  }

  if (events === null) {
    return <p className="text-[12.5px] text-text-muted px-1 py-2">Loading...</p>;
  }

  if (events.length === 0) {
    return <p className="text-[12.5px] text-text-muted px-1 py-2">No SOS events from them yet.</p>;
  }

  return (
    <div className="px-1 py-1">
      {events.map((event) => (
        <div
          key={event._id}
          className="flex items-start justify-between py-2 border-t border-card-border first:border-t-0"
        >
          <div>
            <span className="text-[12.5px] font-semibold text-text-primary block">
              {formatDate(event.triggeredAt)}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 text-[11.5px] text-text-muted">
              <MapPin size={11} className="shrink-0" />
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
          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${
              event.status === 'resolved'
                ? 'bg-resolved-bg text-resolved-text'
                : 'bg-active-bg text-active-text'
            }`}
          >
            {event.status === 'resolved' ? 'Resolved' : 'Active'}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function LinkedAccounts() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [mode, setMode] = useState(null); // null | 'generate' | 'redeem'
  const [generatedCode, setGeneratedCode] = useState(null);
  const [redeemInput, setRedeemInput] = useState('');
  const [redeemError, setRedeemError] = useState('');
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  // Which linked user's SOS panel is currently expanded, if any.
  const [expandedUserId, setExpandedUserId] = useState(null);

  const countdown = useCountdown(generatedCode?.expiresAt);
  const expired = countdown === '0:00';

  const loadConnections = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiClient.get('/links');
      setConnections(res.data.connections);
    } catch (err) {
      setError('Failed to load linked accounts.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConnections();
  }, [loadConnections]);

  const handleGenerateCode = async () => {
    setMode('generate');
    setBusy(true);
    setCopied(false);
    try {
      const res = await apiClient.post('/links/code');
      setGeneratedCode(res.data);
    } catch (err) {
      setError('Could not generate a code. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const handleCopyCode = async () => {
    if (!generatedCode) return;
    try {
      await navigator.clipboard.writeText(generatedCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Clipboard access can fail in some browser contexts — non-critical, ignore silently.
    }
  };

  const handleRedeem = async (e) => {
    e.preventDefault();
    setRedeemError('');

    if (!redeemInput.trim()) {
      setRedeemError('Enter a code first.');
      return;
    }

    setBusy(true);
    try {
      await apiClient.post('/links/redeem', { code: redeemInput.trim() });
      setRedeemInput('');
      setMode(null);
      await loadConnections();
    } catch (err) {
      setRedeemError(err.response?.data?.error || 'Could not redeem this code.');
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = async (connectionId) => {
    try {
      await apiClient.delete(`/links/${connectionId}`);
      setConnections((prev) => prev.filter((c) => c.connectionId !== connectionId));
    } catch (err) {
      setError('Failed to remove this connection.');
    }
  };

  const toggleExpand = (userId) => {
    setExpandedUserId((prev) => (prev === userId ? null : userId));
  };

  return (
    <div className="bg-white border border-card-border rounded-2xl p-5 shadow-[0_2px_10px_rgba(90,30,70,0.05)]">
      <div className="mb-1">
        <span className="flex items-center gap-2 text-[15px] font-bold text-text-primary">
          <Link2 size={16} />
          Link with your emergency contacts
        </span>
        <p className="text-[12px] text-text-muted mt-1">
          Let a trusted contact see your SOS alerts in real time.
        </p>
      </div>

      {error && <p className="text-[13px] text-danger mt-2">{error}</p>}

      <div className="flex gap-2 mt-3">
        <button
          onClick={handleGenerateCode}
          className="flex-1 bg-pill-bg hover:bg-[#E5D4EC] text-text-primary rounded-[10px] py-2 text-[13px] font-semibold transition-colors"
        >
          Generate code
        </button>
        <button
          onClick={() => {
            setMode('redeem');
            setRedeemError('');
          }}
          className="flex-1 bg-pill-bg hover:bg-[#E5D4EC] text-text-primary rounded-[10px] py-2 text-[13px] font-semibold transition-colors"
        >
          Enter a code
        </button>
      </div>

      {mode === 'generate' && (
        <div className="mt-3 bg-bg-lavender rounded-[10px] p-3.5 text-center">
          {busy && !generatedCode ? (
            <p className="text-[13px] text-text-muted">Generating...</p>
          ) : generatedCode ? (
            expired ? (
              <div>
                <p className="text-[13px] text-danger mb-2">This code has expired.</p>
                <button
                  onClick={handleGenerateCode}
                  className="text-[13px] font-semibold text-navbar-end underline"
                >
                  Generate a new one
                </button>
              </div>
            ) : (
              <div>
                <p className="text-[11px] text-text-muted mb-1">Share this code — expires in {countdown}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold tracking-[0.15em] text-text-primary">
                    {generatedCode.code}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    aria-label="Copy code"
                    className="text-navbar-end p-1.5"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            )
          ) : null}
        </div>
      )}

      {mode === 'redeem' && (
        <form onSubmit={handleRedeem} className="mt-3 flex flex-col gap-2">
          {redeemError && <p className="text-[13px] text-danger">{redeemError}</p>}
          <div className="flex gap-2">
            <input
              type="text"
              value={redeemInput}
              onChange={(e) => setRedeemInput(e.target.value.toUpperCase())}
              placeholder="Enter code"
              maxLength={6}
              className="flex-1 px-3 py-2 rounded-[10px] border border-border-input text-sm text-text-primary tracking-widest text-center outline-none focus:border-navbar-end transition-colors"
            />
            <button
              type="submit"
              disabled={busy}
              className="bg-navbar-end hover:bg-[#C2166A] disabled:opacity-60 text-white rounded-[10px] px-4 text-sm font-semibold transition-colors"
            >
              {busy ? 'Linking...' : 'Link'}
            </button>
          </div>
        </form>
      )}

      <div className="mt-4 pt-1">
        {loading ? (
          <p className="text-[13px] text-text-muted py-2">Loading...</p>
        ) : connections.length === 0 ? (
          <p className="text-[13px] text-text-muted py-2">
            No linked accounts yet — generate a code and share it with someone you trust.
          </p>
        ) : (
          connections.map((conn) => {
            const isExpanded = expandedUserId === conn.user._id;
            return (
              <div key={conn.connectionId} className="border-t border-card-border first:border-t-0">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleExpand(conn.user._id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(conn.user._id);
                    }
                  }}
                  className="w-full flex items-center justify-between py-2.5 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-pill-bg text-pill-text flex items-center justify-center text-xs font-semibold">
                      {initials(conn.user.name)}
                    </div>
                    <span className="text-sm font-medium text-text-primary">{conn.user.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-text-muted flex items-center gap-1">
                      <AlertTriangle size={11} />
                      {isExpanded ? 'Hide activity' : 'View activity'}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(conn.connectionId);
                      }}
                      aria-label={`Unlink ${conn.user.name}`}
                      className="text-text-muted hover:text-danger p-1 ml-1 transition-colors"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-bg-lavender rounded-[10px] mb-2 px-2">
                    <LinkedUserSOSPanel userId={conn.user._id} />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}