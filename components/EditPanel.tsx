import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Sparkles, Upload, Globe, CheckCircle } from 'lucide-react';
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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Edit Profile</h2>

      <div className="space-y-5">
        {/* Identity Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={() => handleChange('isVerified', !profile.isVerified)}
              className={`p-2 rounded-md border ${profile.isVerified ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-gray-50 text-gray-400'}`}
              title="Toggle Verification Badge"
            >
              <CheckCircle size={20} />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Friends Count</label>
            <input
              type="number"
              value={profile.friendsCount}
              onChange={(e) => handleChange('friendsCount', parseInt(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Followers</label>
            <input
              type="number"
              value={profile.followersCount}
              onChange={(e) => handleChange('followersCount', parseInt(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Bio Section with AI */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <button
              onClick={handleGenerateBio}
              disabled={isGenerating}
              className="flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-700 disabled:opacity-50 transition-colors"
            >
              <Sparkles size={14} />
              {isGenerating ? 'Magic working...' : 'Auto-Generate'}
            </button>
          </div>
          <textarea
            value={profile.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 gap-3">
          <input
            type="text"
            placeholder="Workplace"
            value={profile.workplace}
            onChange={(e) => handleChange('workplace', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Education"
            value={profile.education}
            onChange={(e) => handleChange('education', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Location"
            value={profile.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Images */}
        <div className="space-y-4 border-t pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
            <div className="flex items-center gap-2">
              <input
                 type="text"
                 placeholder="Image URL"
                 value={profile.profilePhotoUrl}
                 onChange={(e) => handleChange('profilePhotoUrl', e.target.value)}
                 className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
              />
              <label className="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300">
                <Upload size={16} className="text-gray-600" />
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'profilePhotoUrl')} />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Photo</label>
            <div className="flex items-center gap-2">
               <input
                 type="text"
                 placeholder="Image URL"
                 value={profile.coverPhotoUrl}
                 onChange={(e) => handleChange('coverPhotoUrl', e.target.value)}
                 className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
              />
               <label className="cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300">
                <Upload size={16} className="text-gray-600" />
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'coverPhotoUrl')} />
              </label>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="border-t pt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={profile.language === 'ar'}
              onChange={() => handleChange('language', profile.language === 'en' ? 'ar' : 'en')}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <div className="flex items-center gap-2 text-gray-700">
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