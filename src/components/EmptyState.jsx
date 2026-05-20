import { Sparkles } from 'lucide-react';

export default function EmptyState({ onNewChat }) {
  return (
    <div className="flex h-full w-full items-center justify-center px-6 py-10">
      <div className="max-w-2xl text-center animate-fadeUp">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-glow">
          <Sparkles className="h-7 w-7 text-white" />
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Start a conversation</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
          Your assistant is ready. Send a message to begin the chat flow and the empty state will disappear.
        </p>
        <button
          type="button"
          onClick={onNewChat}
          className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
        >
          New chat
        </button>
      </div>
    </div>
  );
}
