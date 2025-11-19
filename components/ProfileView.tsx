import React from 'react';
import { UserProfile } from '../types';
import { 
  MapPin, Briefcase, GraduationCap, MoreHorizontal, 
  MessageCircle, UserPlus, Camera, Heart, ThumbsUp, 
  MessageSquare, Share2, CheckCircle
} from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const ProfileView: React.FC<ProfileViewProps> = ({ profile }) => {
  const isRTL = profile.language === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  // Text translations
  const t = {
    posts: isRTL ? "منشورات" : "Posts",
    about: isRTL ? "حول" : "About",
    friends: isRTL ? "الأصدقاء" : "Friends",
    photos: isRTL ? "صور" : "Photos",
    videos: isRTL ? "فيديو" : "Videos",
    more: isRTL ? "المزيد" : "More",
    addFriend: isRTL ? "إضافة صديق" : "Add Friend",
    message: isRTL ? "مراسلة" : "Message",
    intro: isRTL ? "مقدمة" : "Intro",
    work: isRTL ? "يعمل لدى" : "Works at",
    study: isRTL ? "درس في" : "Studied at",
    live: isRTL ? "يقيم في" : "Lives in",
    follow: isRTL ? "يتابعه" : "Followed by",
    people: isRTL ? "شخصاً" : "people",
    friendCount: isRTL ? "صديق" : "friends",
    whatsOnMind: isRTL ? `بم تفكر يا ${profile.fullName.split(' ')[0]}؟` : `What's on your mind, ${profile.fullName.split(' ')[0]}?`,
    liveVideo: isRTL ? "فيديو مباشر" : "Live video",
    photoVideo: isRTL ? "صورة/فيديو" : "Photo/video",
    reel: isRTL ? "ريلز" : "Reel",
    justNow: isRTL ? "الآن" : "Just now",
    mockPostText: isRTL ? "أحدثت تحديثاً جديداً لملفي الشخصي! ما رأيكم؟" : "Just updated my new profile layout! What do you guys think? #NewLook",
    like: isRTL ? "أعجبني" : "Like",
    comment: isRTL ? "تعليق" : "Comment",
    share: isRTL ? "مشاركة" : "Share",
  };

  return (
    <div className="bg-[#F0F2F5] min-h-screen w-full overflow-x-hidden" dir={dir}>
      {/* --- Top Section (Cover & Header) --- */}
      <div className="bg-white shadow-sm pb-1">
        <div className="max-w-6xl mx-auto">
          
          {/* Cover Photo */}
          <div className="relative w-full h-48 md:h-[350px] lg:h-[400px] bg-gray-300 rounded-b-lg overflow-hidden group">
            <img 
              src={profile.coverPhotoUrl} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 md:right-8 bg-white px-3 py-1.5 rounded-md shadow-md flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition opacity-0 group-hover:opacity-100 md:opacity-100">
              <Camera size={18} className="text-gray-800" />
              <span className="text-sm font-semibold text-gray-800 hidden md:inline">{isRTL ? "تعديل صورة الغلاف" : "Edit cover photo"}</span>
            </div>
          </div>

          {/* Profile Header Info */}
          <div className="px-4 md:px-8 pb-4">
            <div className="flex flex-col md:flex-row items-start md:items-end relative -mt-12 md:-mt-8 mb-4">
              
              {/* Profile Picture */}
              <div className="relative mx-auto md:mx-0">
                <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-sm relative">
                   <img 
                    src={profile.profilePhotoUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full border-2 border-white cursor-pointer hover:bg-gray-300 transition">
                  <Camera size={20} className="text-gray-800" />
                </div>
              </div>

              {/* Name & Friends */}
              <div className={`mt-4 md:mt-0 md:mb-4 flex-1 text-center ${isRTL ? 'md:text-right md:mr-5' : 'md:text-left md:ml-5'}`}>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
                  {profile.fullName}
                  {profile.isVerified && <CheckCircle size={24} className="text-blue-500 fill-blue-500 text-white" />}
                </h1>
                <p className="text-gray-500 font-semibold mt-1 text-base md:text-lg">
                  {formatNumber(profile.friendsCount)} {t.friendCount}
                </p>
                {/* Mutual Friends Mock Icons */}
                <div className={`flex items-center justify-center md:justify-start mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                   {[...Array(3)].map((_, i) => (
                     <img 
                       key={i}
                       src={`https://picsum.photos/id/${100+i}/50/50`} 
                       className={`w-8 h-8 rounded-full border-2 border-white ${i !== 0 ? (isRTL ? '-mr-2' : '-ml-2') : ''}`}
                       alt="friend"
                     />
                   ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full md:w-auto mt-4 md:mt-0 md:mb-6 flex flex-col sm:flex-row gap-2 justify-center">
                 <button className="bg-[#0866FF] text-white px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition">
                   <UserPlus size={20} />
                   {t.addFriend}
                 </button>
                 <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-gray-300 transition">
                   <MessageCircle size={20} />
                   {t.message}
                 </button>
                 <button className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md font-semibold flex items-center justify-center hover:bg-gray-300 transition">
                   <MoreHorizontal size={20} />
                 </button>
              </div>
            </div>

            <div className="border-t border-gray-300 mt-4"></div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 mt-1 overflow-x-auto no-scrollbar">
               {[t.posts, t.about, t.friends, t.photos, t.videos, t.more].map((tab, idx) => (
                 <div 
                   key={tab} 
                   className={`px-4 py-3 font-semibold cursor-pointer whitespace-nowrap rounded-md transition
                     ${idx === 0 
                       ? 'text-[#0866FF] border-b-4 border-[#0866FF] rounded-none' 
                       : 'text-gray-600 hover:bg-gray-100'}`}
                 >
                   {tab}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="max-w-6xl mx-auto px-0 md:px-4 lg:px-8 py-4 flex flex-col md:flex-row gap-4">
        
        {/* Left Sidebar (Intro & Photos) */}
        <div className="w-full md:w-[40%] lg:w-[360px] space-y-4">
          {/* Intro Card */}
          <div className="bg-white rounded-lg shadow-sm p-4">
             <h2 className="text-xl font-bold text-gray-900 mb-3">{t.intro}</h2>
             
             {profile.bio && (
               <div className="text-center mb-4">
                 <p className="text-gray-800 text-[15px]">{profile.bio}</p>
                 <div className="border-b my-3"></div>
               </div>
             )}

             <div className="space-y-3 text-[15px] text-gray-700">
                {profile.workplace && (
                  <div className="flex items-center gap-3">
                    <Briefcase size={20} className="text-gray-400 shrink-0" />
                    <span>{t.work} <strong>{profile.workplace}</strong></span>
                  </div>
                )}
                {profile.education && (
                  <div className="flex items-center gap-3">
                    <GraduationCap size={20} className="text-gray-400 shrink-0" />
                    <span>{t.study} <strong>{profile.education}</strong></span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-gray-400 shrink-0" />
                    <span>{t.live} <strong>{profile.location}</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                    <Heart size={20} className="text-gray-400 shrink-0" />
                    <span>{t.follow} <strong>{formatNumber(profile.followersCount)}</strong> {t.people}</span>
                </div>
             </div>
             
             <div className="mt-4 grid grid-cols-1 gap-2">
                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-1.5 rounded-md font-semibold text-sm transition">
                   Edit details
                </button>
             </div>
          </div>

          {/* Photos Preview */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-gray-900">{t.photos}</h2>
              <span className="text-[#0866FF] text-[15px] cursor-pointer hover:underline">{t.more}</span>
            </div>
            <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
               {[...Array(9)].map((_, i) => (
                 <img 
                  key={i} 
                  src={`https://picsum.photos/id/${50+i}/300/300`} 
                  className="w-full h-full object-cover aspect-square cursor-pointer hover:opacity-90" 
                  alt="gallery" 
                />
               ))}
            </div>
          </div>
        </div>

        {/* Right Main Feed */}
        <div className="flex-1 space-y-4">
           
           {/* Create Post Input */}
           <div className="bg-white rounded-lg shadow-sm p-3">
              <div className="flex items-center gap-2 mb-3">
                <img src={profile.profilePhotoUrl} className="w-10 h-10 rounded-full object-cover" alt="me" />
                <div className="bg-gray-100 hover:bg-gray-200 flex-1 rounded-full px-3 py-2 cursor-pointer transition">
                  <span className="text-gray-500 text-[15px]">{t.whatsOnMind}</span>
                </div>
              </div>
              <div className="border-t pt-2 flex justify-evenly">
                 <div className="flex items-center gap-2 px-2 md:px-6 py-2 hover:bg-gray-50 rounded-md cursor-pointer">
                   <div className="text-red-500"><Camera size={24}/></div>
                   <span className="text-gray-600 font-medium text-sm hidden sm:block">{t.liveVideo}</span>
                 </div>
                 <div className="flex items-center gap-2 px-2 md:px-6 py-2 hover:bg-gray-50 rounded-md cursor-pointer">
                   <div className="text-green-500"><MessageSquare size={24}/></div>
                   <span className="text-gray-600 font-medium text-sm hidden sm:block">{t.photoVideo}</span>
                 </div>
                 <div className="flex items-center gap-2 px-2 md:px-6 py-2 hover:bg-gray-50 rounded-md cursor-pointer">
                   <div className="text-yellow-500"><Heart size={24}/></div>
                   <span className="text-gray-600 font-medium text-sm hidden sm:block">{t.reel}</span>
                 </div>
              </div>
           </div>

           {/* Mock Post */}
           <div className="bg-white rounded-lg shadow-sm pb-2">
             <div className="p-3 flex items-start gap-2">
                <img src={profile.profilePhotoUrl} className="w-10 h-10 rounded-full object-cover border border-gray-200" alt="author" />
                <div>
                  <h3 className="font-semibold text-gray-900 hover:underline cursor-pointer">{profile.fullName}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <span>{t.justNow}</span>
                    <span>•</span>
                    <Globe size={12} />
                  </div>
                </div>
                <div className={`${isRTL ? 'mr-auto' : 'ml-auto'} text-gray-500 p-2 hover:bg-gray-100 rounded-full`}>
                  <MoreHorizontal size={20} />
                </div>
             </div>
             
             <div className="px-3 pb-2 text-[15px] text-gray-900">
                {t.mockPostText}
             </div>

             <div className="bg-gray-100 w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/id/237/800/600" className="w-full h-full object-cover" alt="Post content" />
             </div>

             <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200">
               <div className="flex items-center gap-1">
                 <div className="bg-[#0866FF] rounded-full p-1 text-white"><ThumbsUp size={12} fill="white" /></div>
                 <span className="text-gray-500 text-sm hover:underline cursor-pointer">12</span>
               </div>
             </div>

             <div className="flex items-center justify-evenly pt-1 px-2">
               <div className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition text-gray-600 font-medium">
                 <ThumbsUp size={20} /> <span className="text-sm">{t.like}</span>
               </div>
               <div className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition text-gray-600 font-medium">
                 <MessageSquare size={20} /> <span className="text-sm">{t.comment}</span>
               </div>
               <div className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition text-gray-600 font-medium">
                 <Share2 size={20} /> <span className="text-sm">{t.share}</span>
               </div>
             </div>
           </div>

        </div>
      </div>
      
      {/* Footer Credit */}
      <div className="text-center py-6 text-gray-500 text-xs">
        <p>SocialForge Facebook Clone © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

// Helper for icon needed in code but not imported above
function Globe({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="text-gray-500"
    >
       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  )
}

export default ProfileView;