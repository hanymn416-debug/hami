import React from 'react';
import { UserProfile } from '../types';
import { 
  MapPin, Briefcase, GraduationCap, MoreHorizontal, 
  MessageCircle, UserPlus, Camera, Heart, ThumbsUp, 
  MessageSquare, Share2, CheckCircle, Globe as GlobeIcon
} from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
}

const formatNumber = (num: number) => {
  if (!num) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
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
    <div className="bg-[#F0F2F5] min-h-screen w-full overflow-x-hidden font-sans" dir={dir}>
      {/* --- Top Section (Cover & Header) --- */}
      <div className="bg-white shadow-sm pb-1">
        <div className="max-w-6xl mx-auto">
          
          {/* Cover Photo */}
          <div className="relative w-full h-48 md:h-[350px] lg:h-[400px] bg-gray-300 rounded-b-lg overflow-hidden group shadow-inner">
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
              <div className="relative mx-auto md:mx-0 z-10">
                <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-md relative group">
                   <img 
                    src={profile.profilePhotoUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover transition transform group-hover:scale-105 duration-500"
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
                <div className="flex flex-col md:flex-row items-center md:items-start gap-1 mt-1">
                  <p className="text-gray-500 font-semibold text-base md:text-lg hover:underline cursor-pointer">
                    {formatNumber(profile.friendsCount)} {t.friendCount}
                  </p>
                  <span className="hidden md:block text-gray-400">•</span>
                  <p className="text-gray-500 font-semibold text-base md:text-lg hover:underline cursor-pointer">
                    {formatNumber(profile.followersCount)} {isRTL ? "متابع" : "Followers"}
                  </p>
                </div>

                {/* Mutual Friends Mock Icons */}
                <div className={`flex items-center justify-center md:justify-start mt-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
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
                 <button className="bg-[#0866FF] text-white px-4 py-2 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition active:scale-95">
                   <UserPlus size={20} />
                   {t.addFriend}
                 </button>
                 <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-gray-300 transition active:scale-95">
                   <MessageCircle size={20} />
                   {t.message}
                 </button>
                 <button className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md font-semibold flex items-center justify-center hover:bg-gray-300 transition active:scale-95">
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
                   className={`px-4 py-3 font-semibold cursor-pointer whitespace-nowrap rounded-md transition relative
                     ${idx === 0 
                       ? 'text-[#0866FF]' 
                       : 'text-gray-600 hover:bg-gray-100'}`}
                 >
                   {tab}
                   {idx === 0 && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0866FF] rounded-t-md"></div>}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="max-w-6xl mx-auto px-0 md:px-4 lg:px-8 py-4 flex flex-col md:flex-row gap-4">
        
        {/* Left Sidebar (Intro & Photos) */}
        <div className="w-full md:w-[40%] lg:w-[360px] space-y-4 px-2 md:px-0">
          {/* Intro Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
             <h2 className="text-xl font-bold text-gray-900 mb-3">{t.intro}</h2>
             
             {profile.bio && (
               <div className="text-center mb-4">
                 <p className="text-gray-800 text-[15px] leading-relaxed">{profile.bio}</p>
                 <div className="border-b my-3"></div>
               </div>
             )}

             <div className="space-y-4 text-[15px] text-gray-700">
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
                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md font-semibold text-sm transition">
                   Edit details
                </button>
             </div>
          </div>

          {/* Photos Preview */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-gray-900">{t.photos}</h2>
              <span className="text-[#0866FF] text-[15px] cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md transition">{t.more}</span>
            </div>
            <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
               {[...Array(9)].map((_, i) => (
                 <img 
                  key={i} 
                  src={`https://picsum.photos/id/${50+i}/300/300`} 
                  className="w-full h-full object-cover aspect-square cursor-pointer hover:opacity-90 transition" 
                  alt="gallery" 
                />
               ))}
            </div>
          </div>
        </div>

        {/* Right Main Feed */}
        <div className="flex-1 space-y-4 px-2 md:px-0">
           
           {/* Create Post Input */}
           <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <img src={profile.profilePhotoUrl} className="w-10 h-10 rounded-full object-cover border border-gray-100" alt="me" />
                <div className="bg-gray-100 hover:bg-gray-200 flex-1 rounded-full px-3 py-2 cursor-pointer transition">
                  <span className="text-gray-500 text-[15px] select-none">{t.whatsOnMind}</span>
                </div>
              </div>
              <div className="border-t pt-2 flex justify-evenly">
                 <div className="flex items-center gap-2 px-2 md:px-6 py-2 hover:bg-gray-50 rounded-md cursor-pointer transition">
                   <div className="text-red-500"><Camera size={24}/></div>
                   <span className="text-gray-600 font-semibold text-sm hidden sm:block">{t.liveVideo}</span>
                 </div>
                 <div className="flex items-center gap-2 px-2 md:px-6 py-2 hover:bg-gray-50 rounded-md cursor-pointer transition">
                   <div className="text-green-500"><MessageSquare size={24}/></div>
                   <span className="text-gray-600 font-semibold text-sm hidden sm:block">{t.photoVideo}</span>
                 </div>
                 <div className="flex items-center gap-2 px-2 md:px-6 py-2 hover:bg-gray-50 rounded-md cursor-pointer transition">
                   <div className="text-yellow-500"><Heart size={24}/></div>
                   <span className="text-gray-600 font-semibold text-sm hidden sm:block">{t.reel}</span>
                 </div>
              </div>
           </div>

           {/* Mock Post */}
           <div className="bg-white rounded-lg shadow-sm pb-2 border border-gray-100">
             <div className="p-3 flex items-start gap-2">
                <img src={profile.profilePhotoUrl} className="w-10 h-10 rounded-full object-cover border border-gray-200" alt="author" />
                <div>
                  <h3 className="font-semibold text-gray-900 hover:underline cursor-pointer">{profile.fullName}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <span className="hover:underline cursor-pointer">{t.justNow}</span>
                    <span>•</span>
                    <GlobeIcon size={12} className="text-gray-500" />
                  </div>
                </div>
                <div className={`${isRTL ? 'mr-auto' : 'ml-auto'} text-gray-500 p-2 hover:bg-gray-100 rounded-full cursor-pointer transition`}>
                  <MoreHorizontal size={20} />
                </div>
             </div>
             
             <div className="px-3 pb-3 text-[15px] text-gray-900 leading-normal" dir="auto">
                {t.mockPostText}
             </div>

             <div className="bg-gray-100 w-full min-h-[300px] flex items-center justify-center overflow-hidden cursor-pointer">
                <img src="https://picsum.photos/id/237/800/600" className="w-full h-auto object-cover max-h-[500px]" alt="Post content" />
             </div>

             <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200">
               <div className="flex items-center gap-1 cursor-pointer hover:underline">
                 <div className="bg-[#0866FF] rounded-full p-1 text-white"><ThumbsUp size={10} fill="white" /></div>
                 <span className="text-gray-500 text-sm">12</span>
               </div>
               <div className="flex gap-3 text-gray-500 text-sm">
                 <span className="hover:underline cursor-pointer">2 {t.comment}</span>
                 <span className="hover:underline cursor-pointer">1 {t.share}</span>
               </div>
             </div>

             <div className="flex items-center justify-evenly pt-1 px-2">
               <div className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition text-gray-600 font-semibold group">
                 <ThumbsUp size={20} className="group-hover:scale-110 transition-transform" /> <span className="text-sm">{t.like}</span>
               </div>
               <div className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition text-gray-600 font-semibold">
                 <MessageSquare size={20} /> <span className="text-sm">{t.comment}</span>
               </div>
               <div className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition text-gray-600 font-semibold">
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

export default ProfileView;