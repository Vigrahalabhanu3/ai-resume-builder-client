// ============================================
// ChatPanel.jsx - AI Chat Interface
// ============================================
// Chat with the AI Interview Agent. Shows message
// history, quick actions, and input at the bottom.
// ============================================

import './index.css';
import { useState, useEffect, useRef, useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext.jsx';
import { chatWithAgent, getChatHistory } from '../../services/aiService.js';
import ChatMessage from '../ChatMessage';
import ChatInput from '../ChatInput';
import { HiSparkles, HiBriefcase, HiDocumentText, HiWrenchScrewdriver } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const QUICK_ACTIONS = [
  { label: 'Build my experience', icon: HiBriefcase, message: 'Help me describe my work experience with strong bullet points.' },
  { label: 'Write my summary', icon: HiDocumentText, message: 'Help me write a professional summary for my resume.' },
  { label: 'Help with skills', icon: HiWrenchScrewdriver, message: 'Help me identify and organize my skills for my resume.' },
];

function ChatPanel() {
  const { resume, updateSection } = useContext(ResumeContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef(null);

  // Load chat history on mount
  useEffect(() => {
    const loadHistory = async () => {
      if (!resume._id) {
        setIsLoadingHistory(false);
        return;
      }
      try {
        const history = await getChatHistory(resume._id);
        if (history && history.length > 0) {
          setMessages(history);
        }
      } catch (error) {
        // Chat history may not exist yet
      }
      setIsLoadingHistory(false);
    };

    loadHistory();
  }, [resume._id]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text) => {
    if (!resume._id) return;

    const userMessage = {
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatWithAgent(resume._id, text);
      const assistantMessage = {
        role: 'assistant',
        content: response.message || response,
        timestamp: new Date().toISOString(),
        extractedData: response.extractedData || null,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Failed to get AI response');
    }
    setIsLoading(false);
  };

  const handleApplyData = (extractedData) => {
    if (!extractedData) return;
    try {
      Object.entries(extractedData).forEach(([section, data]) => {
        updateSection(section, data);
      });
      toast.success('Applied to resume!');
    } catch (error) {
      toast.error('Failed to apply data');
    }
  };

  return (
    <div className="chat-container flex-col h-full">
      {/* Quick Actions */}
      {messages.length === 0 && !isLoadingHistory && (
        <div className="p-md flex-col gap-sm">
          <div className="flex-col flex-center p-md">
            <div className="icon-circle icon-circle-purple mb-sm">
              <HiSparkles />
            </div>
            <h3 className="heading-sm">AI Resume Assistant</h3>
            <p className="text-muted text-xs mt-sm">
              I can help you build each section of your resume.
            </p>
          </div>
          <div className="flex-col gap-xs">
            {QUICK_ACTIONS.map(({ label, icon: Icon, message }) => (
              <button
                key={label}
                onClick={() => handleSend(message)}
                className="quick-action-btn"
              >
                <Icon className="shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading history */}
      {isLoadingHistory && (
        <div className="flex-center p-md">
          <div className="spinner" />
        </div>
      )}

      {/* Messages */}
      {messages.length > 0 && (
        <div className="chat-messages grow overflow-auto p-md flex-col gap-sm">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              role={msg.role}
              content={msg.content}
              timestamp={msg.timestamp}
              extractedData={msg.extractedData}
              onApply={handleApplyData}
            />
          ))}

          {isLoading && (
            <div className="flex-row items-center gap-xs text-muted text-xs p-sm">
              <div className="spinner spinner-sm" />
              <span>AI is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input */}
      <div className="shrink-0 p-sm">
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default ChatPanel;
