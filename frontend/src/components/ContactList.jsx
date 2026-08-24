import { Users, Plus, Trash2 } from 'lucide-react';

export default function Contaclist({ contacts, onAddClick, onDelete }) {
  return (
    <div className="bg-white border border-card-border rounded-2xl p-5 shadow-[0_2px_10px_rgba(90,30,70,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <span className="flex items-center gap-2 text-[15px] font-bold text-text-primary">
          <Users size={16} />
          Emergency contacts
        </span>
        <button
          onClick={onAddClick}
          aria-label="Add contact"
          className="w-[30px] h-[30px] rounded-full bg-pill-bg hover:bg-[#E5D4EC] text-pill-text flex items-center justify-center transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {contacts.length === 0 && (
        <p className="text-[13px] text-text-muted py-2">
          No emergency contacts yet — add one to get started.
        </p>
      )}

      {contacts.map((contact) => (
        <div
          key={contact._id}
          className="flex items-center justify-between py-3 border-b border-card-border last:border-b-0"
        >
          <div>
            <div className="text-sm font-bold text-text-primary">{contact.name}</div>
            <div className="text-[12.5px] text-text-muted mt-0.5">
              {contact.relationship} · {contact.phone}
            </div>
          </div>
          <button
            onClick={() => onDelete(contact._id)}
            aria-label={`Delete ${contact.name}`}
            className="text-danger opacity-75 hover:opacity-100 p-1.5 transition-opacity"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}