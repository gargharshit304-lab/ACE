import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot } from 'lucide-react';

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
  });
}

function CodeBlock({ inline, className, children }) {
  const match = /language-(\w+)/.exec(className || '');

  if (inline) {
    return <code className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.95em] text-white">{children}</code>;
  }

  return (
    <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/80 p-4 text-sm text-white shadow-glow">
      <code className={match ? `language-${match[1]}` : ''}>{children}</code>
    </pre>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={['flex w-full gap-3 animate-fadeUp', isUser ? 'justify-end' : 'justify-start'].join(' ')}>
      {!isUser ? (
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white shadow-glow">
          <Bot className="h-5 w-5" />
        </div>
      ) : null}

      <div className={['max-w-[min(78%,44rem)] rounded-3xl border px-4 py-3 sm:px-5 sm:py-4', isUser ? 'border-cyan-400/20 bg-gradient-to-br from-cyan-400/15 to-fuchsia-500/20 text-white' : 'border-white/10 bg-white/[0.03] text-white'].join(' ')}>
        <div className="prose prose-invert max-w-none prose-p:my-0 prose-headings:mb-2 prose-headings:mt-0 prose-ul:my-2 prose-ol:my-2 prose-li:my-0 prose-a:text-cyan-300 prose-strong:text-white prose-code:text-white">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: CodeBlock,
              a: ({ children, ...props }) => (
                <a {...props} target="_blank" rel="noreferrer" className="text-cyan-300 underline decoration-white/20 underline-offset-4 transition hover:text-cyan-200">
                  {children}
                </a>
              )
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        <div className={['mt-3 text-xs text-white/45', isUser ? 'text-right' : 'text-left'].join(' ')}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}
