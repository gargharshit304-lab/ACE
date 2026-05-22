import { ChevronLeft, History, Plus, Settings, MessageSquareText, Clock3 } from 'lucide-react';
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
        className="mb-5 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
      >
        <Plus className="h-4 w-4" />
        New chat
      </button>

      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
          <History className="h-3.5 w-3.5" />
          Chat history
        </div>

        <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/40">
          {chats.length} chats
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {chats.map((chat) => {
          const isActive = chat.id === activeChatId;
          const preview = chat.messages?.find((message) => message.role === 'assistant')?.content
            || chat.messages?.find((message) => message.role === 'user')?.content
            || 'Start a new conversation';

          return (
            <button
              key={chat.id}
              type="button"
              onClick={() => onSelectChat(chat.id)}
              className={[
                'group w-full rounded-3xl border px-4 py-4 text-left transition duration-200',
                isActive ? 'border-white/20 bg-white/10 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)]' : 'border-white/5 bg-white/[0.02] text-white/70 hover:border-white/10 hover:bg-white/[0.04]'
              ].join(' ')}
            >
              <div className="flex items-start gap-3">
                <div className={['mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border', isActive ? 'border-white/20 bg-white/10 text-white' : 'border-white/10 bg-black/40 text-white/45'].join(' ')}>
                  <MessageSquareText className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{chat.title || 'New Chat'}</div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-white/40">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-3 w-3" />
                          {formatChatTime(chat.updatedAt || chat.createdAt)}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/20" />
                        <span>{chat.messages?.length ? `${chat.messages.length} msgs` : 'Empty'}</span>
                      </div>
                    </div>

                    {isActive ? (
                      <div className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-white">
                        Active
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-3 line-clamp-2 text-sm leading-6 text-white/50 group-hover:text-white/70">
                    {preview}
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-white/35">
                    <span className="truncate">{chat.model || 'No model yet'}</span>
                    <span className={['inline-flex h-2 w-2 rounded-full', isActive ? 'bg-emerald-400' : 'bg-white/20'].join(' ')} />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-4 inline-flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left text-sm text-white/70 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
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
