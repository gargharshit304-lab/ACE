import { ChevronLeft, History, Plus, Settings } from 'lucide-react';
import BrandMark from './BrandMark';

function formatChatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export default function Sidebar({ open, onClose, onNewChat, chats = [], activeChatId, onSelectChat }) {
  return (
    <aside
      className={[
        'fixed inset-y-0 left-0 z-30 flex w-[290px] flex-col border-r border-white/5 bg-black/95 px-4 py-5 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ].join(' ')}
    >
      <div className="mb-5 flex items-center justify-between">
        <BrandMark />

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-white/10 p-2 text-white/70 transition hover:border-white/20 hover:bg-white/5 lg:hidden"
          aria-label="Close sidebar"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={onNewChat}
        className="mb-4 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
      >
        <Plus className="h-4 w-4" />
        New chat
      </button>

      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
        <History className="h-3.5 w-3.5" />
        Chat history
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {chats.map((chat) => {
          const isActive = chat.id === activeChatId;

          return (
            <button
              key={chat.id}
              type="button"
              onClick={() => onSelectChat(chat.id)}
              className={[
                'w-full rounded-2xl border px-4 py-3 text-left transition',
                isActive ? 'border-white/20 bg-white/10 text-white' : 'border-white/5 bg-white/[0.02] text-white/70 hover:border-white/10 hover:bg-white/[0.04]'
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{chat.title || 'New Chat'}</div>
                  <div className="mt-1 truncate text-xs text-white/45">
                    {chat.messages?.length ? `${chat.messages.length} messages` : 'Empty chat'}
                  </div>
                </div>

                <div className="shrink-0 text-[11px] uppercase tracking-[0.22em] text-white/35">
                  {formatChatTime(chat.updatedAt || chat.createdAt)}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-white/40">
                <span>{chat.model || 'No model yet'}</span>
                {isActive ? <span className="text-white">Active</span> : null}
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-4 inline-flex items-center gap-3 rounded-2xl border border-white/5 px-4 py-3 text-left text-sm text-white/70 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
      >
        <Settings className="h-4 w-4" />
        Settings
      </button>

      <div className="mt-auto rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-4 text-xs text-white/45">
        <p className="mb-1 font-medium text-white/70">ACE</p>
        <p>Frontend interface for local text and image AI backends.</p>
      </div>
    </aside>
  );
}
