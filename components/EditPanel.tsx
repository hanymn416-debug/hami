import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Sparkles, Upload, Globe, CheckCircle, Users, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { generateAIBio } from '../services/geminiService';

interface EditPanelProps {
  profile: UserProfile;
  onChange: (newProfile: UserProfile) => void;
}

const EditPanel: React.FC<EditPanelProps> = ({ profile, onChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (field: keyof UserProfile, value: any) => {
    onChange({ ...profile, [field]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof UserProfile) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleChange(field, url);
    }
  };

  const handleGenerateBio = async () => {
    setIsGenerating(true);
    const newBio = await generateAIBio(profile.fullName, profile.workplace, 'professional');
    handleChange('bio', newBio);
    setIsGenerating(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full overflow-y-auto custom-scrollbar">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 flex items-center justify-between">
        <span>Edit Profile</span>
        <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">Editor</span>
      </h2>

      <div className="space-y-6">
        {/* Identity Section */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700">Full Name</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition shadow-sm"
              placeholder="Enter name..."
            />
            <button
              onClick={() => handleChange('isVerified', !profile.isVerified)}
              className={`px-3 rounded-lg border transition flex items-center justify-center ${profile.isVerified ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'}`}
              title={profile.isVerified ? "Remove Verification" : "Add Verification"}
            >
              <CheckCircle size={20} />
            </button>
          </div>
        </div>

        {/* Social Stats Section - ENHANCED */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-blue-800 font-bold border-b border-blue-200 pb-2">
            <Users size={18} />
            <h3>Audience & Stats / الجمهور</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-blue-600 uppercase mb-1">Friends Count</label>
              <input
                type="number"
                value={profile.friendsCount}
                onChange={(e) => handleChange('friendsCount', parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-center font-mono font-semibold text-gray-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-blue-600 uppercase mb-1">Followers Count</label>
              <input
                type="number"
                value={profile.followersCount}
                onChange={(e) => handleChange('followersCount', parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-center font-mono font-semibold text-gray-700"
              />
            </div>
          </div>
          <p className="text-[10px] text-blue-400 mt-2 text-center">Numbers will be formatted (e.g. 1.2K, 1M) automatically.</p>
        </div>

        {/* Bio Section with AI */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-gray-700">Bio / Intro</label>
            <button
              onClick={handleGenerateBio}
              disabled={isGenerating}
              className="flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 px-2 py-1 rounded-md hover:opacity-90 disabled:opacity-50 transition-all shadow-sm"
            >
              <Sparkles size={12} />
              {isGenerating ? 'Thinking...' : 'AI Write'}
            </button>
          </div>
          <textarea
            value={profile.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={3}
            placeholder="Describe yourself..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none text-sm"
          />
        </div>

        {/* Details */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700">Personal Details</label>
          <div className="relative">
            <Briefcase size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Workplace"
              value={profile.workplace}
              onChange={(e) => handleChange('workplace', e.target.value)}
              className="w-full pl-9 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div className="relative">
            <GraduationCap size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Education"
              value={profile.education}
              onChange={(e) => handleChange('education', e.target.value)}
              className="w-full pl-9 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              value={profile.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full pl-9 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4 border-t border-gray-100 pt-4">
          <h3 className="font-bold text-gray-700 text-sm">Images</h3>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Profile Picture URL</label>
            <div className="flex items-center gap-2">
              <input
                 type="text"
                 placeholder="https://..."
                 value={profile.profilePhotoUrl}
                 onChange={(e) => handleChange('profilePhotoUrl', e.target.value)}
                 className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
              <label className="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 transition">
                <Upload size={16} className="text-gray-600" />
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'profilePhotoUrl')} />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Cover Photo URL</label>
            <div className="flex items-center gap-2">
               <input
                 type="text"
                 placeholder="https://..."
                 value={profile.coverPhotoUrl}
                 onChange={(e) => handleChange('coverPhotoUrl', e.target.value)}
                 className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
               <label className="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 transition">
                <Upload size={16} className="text-gray-600" />
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'coverPhotoUrl')} />
              </label>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="border-t pt-4 bg-gray-50 -mx-6 px-6 pb-2 mt-2">
          <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition">
            <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${profile.language === 'ar' ? 'bg-green-500' : 'bg-gray-300'}`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${profile.language === 'ar' ? 'translate-x-4' : ''}`}></div>
            </div>
            <input
              type="checkbox"
              checked={profile.language === 'ar'}
              onChange={() => handleChange('language', profile.language === 'en' ? 'ar' : 'en')}
              className="hidden"
            />
            <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
              <Globe size={16} />
              <span>Arabic Layout / وضع عربي</span>
            </div>
          </label>
        </div>

      </div>
    </div>
  );
};

export default EditPanel;