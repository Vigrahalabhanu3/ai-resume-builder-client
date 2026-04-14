// ============================================
// ChatInput.jsx - Chat Message Input
// ============================================
// Auto-growing textarea with send button.
// Enter sends, Shift+Enter adds newline.
// ============================================

import { useState, useRef } from 'react';
import { HiPaperAirplane } from 'react-icons/hi2';

function ChatInput({ onSend, isLoading }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setText('');
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setText(e.target.value);
    // Auto-grow
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const canSend = text.trim() && !isLoading;

  return (
    <div className="chat-input-area">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        rows={1}
        className="chat-textarea"
        placeholder="Ask the AI assistant..."
      />
      <button
        onClick={handleSend}
        disabled={!canSend}
        className={canSend ? 'chat-send-btn' : 'chat-send-btn-disabled'}
      >
        <HiPaperAirplane />
      </button>
    </div>
  );
}

export default ChatInput;
