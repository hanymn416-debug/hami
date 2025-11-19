import React, { useState } from 'react';
import EditPanel from './components/EditPanel';
import ProfileView from './components/ProfileView';
import { UserProfile, DEFAULT_PROFILE } from './types';
import { Edit3, Eye } from 'lucide-react';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [activeTab, setActiveTab] = useState<'edit' | 'view'>('edit');

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-gray-100">
      
      {/* Header for Mobile/Tablet Switcher */}
      <div className="lg:hidden bg-white border-b p-2 flex justify-center gap-4 z-20 shadow-sm">
        <button 
          onClick={() => setActiveTab('edit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === 'edit' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          <Edit3 size={18} /> Edit
        </button>
        <button 
          onClick={() => setActiveTab('view')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === 'view' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          <Eye size={18} /> Preview
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Editor (Hidden on mobile if view active, Fixed width on Desktop) */}
        <div 
          className={`
            lg:w-[400px] w-full h-full bg-white z-10 transition-all duration-300
            ${activeTab === 'view' ? 'hidden lg:block' : 'block'}
            border-r border-gray-200
          `}
        >
          <EditPanel profile={profile} onChange={setProfile} />
        </div>

        {/* Right Panel - Preview (Hidden on mobile if edit active, Flex-1 on Desktop) */}
        <div 
          className={`
            flex-1 h-full bg-[#F0F2F5] overflow-y-auto relative
            ${activeTab === 'edit' ? 'hidden lg:block' : 'block'}
          `}
        >
          <ProfileView profile={profile} />
        </div>
      </div>
    </div>
  );
};

export default App;