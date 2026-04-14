// ============================================
// ChatMessage.jsx - Single Chat Message Bubble
// ============================================
// Displays user or assistant message with proper
// alignment and optional "Apply to resume" button.
// ============================================

import { HiSparkles, HiCheckCircle } from 'react-icons/hi2';

function ChatMessage({ role, content, timestamp, extractedData, onApply }) {
  const isUser = role === 'user';

  const formatTime = (ts) => {
    if (!ts) return '';
    return new Date(ts).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit',
    });
  };

  return (
    <div className={`flex-row ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}>
        {!isUser && (
          <div className="flex-row items-center gap-xs mb-sm">
            <HiSparkles className="text-xs text-purple" />
            <span className="text-xs font-semibold text-purple">AI Assistant</span>
          </div>
        )}

        <p className="text-sm">
          {content}
        </p>

        <div className={`flex-row items-center gap-sm mt-sm ${isUser ? 'justify-end' : 'flex-between'}`}>
          <span className="chat-timestamp">
            {formatTime(timestamp)}
          </span>

          {extractedData && !isUser && (
            <button
              onClick={() => onApply(extractedData)}
              className="btn btn-outline btn-xs flex-row items-center gap-xs"
            >
              <HiCheckCircle className="text-xs" />
              Apply to resume
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
