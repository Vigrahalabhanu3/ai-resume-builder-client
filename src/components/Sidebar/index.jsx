// ============================================
// Sidebar.jsx - Left Panel Tab Navigation
// ============================================
// Renders tab buttons and the active tab content.
// Tabs: Sections, AI Chat, ATS, Templates
// ============================================

import './index.css';
import { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext.jsx';
import SectionEditor from '../SectionEditor';
import ChatPanel from '../ChatPanel';
import AtsScorePanel from '../AtsScorePanel';
import TemplateSelector from '../TemplateSelector';
import { HiRectangleStack, HiChatBubbleLeftRight, HiChartBar, HiSquares2X2 } from 'react-icons/hi2';

const TABS = [
  { id: 'sections', label: 'Sections', icon: HiRectangleStack },
  { id: 'ai', label: 'AI Chat', icon: HiChatBubbleLeftRight },
  { id: 'ats', label: 'ATS', icon: HiChartBar },
  { id: 'templates', label: 'Templates', icon: HiSquares2X2 },
];

function Sidebar() {
  const { activeTab, setActiveTab } = useContext(ResumeContext);

  const renderContent = () => {
    switch (activeTab) {
      case 'sections':
        return <SectionEditor />;
      case 'ai':
        return <ChatPanel />;
      case 'ats':
        return <AtsScorePanel />;
      case 'templates':
        return <TemplateSelector />;
      default:
        return <SectionEditor />;
    }
  };

  return (
    <div className="sidebar">
      {/* Tab buttons */}
      <div className="sidebar-tabs">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`sidebar-tab ${activeTab === id ? 'sidebar-tab-active' : ''}`}
          >
            <Icon className="sidebar-tab-icon" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="sidebar-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Sidebar;
