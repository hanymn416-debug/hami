export interface UserProfile {
  fullName: string;
  bio: string;
  coverPhotoUrl: string;
  profilePhotoUrl: string;
  location: string;
  workplace: string;
  education: string;
  friendsCount: number;
  followersCount: number;
  joinDate: string;
  isVerified: boolean;
  language: 'en' | 'ar'; // For RTL support
}

export const DEFAULT_PROFILE: UserProfile = {
  fullName: "Samir Al-Masri",
  bio: "Digital Artist & Coffee Enthusiast ☕ | Creating moments out of pixels.",
  coverPhotoUrl: "https://picsum.photos/1200/400",
  profilePhotoUrl: "https://picsum.photos/200/200",
  location: "Cairo, Egypt",
  workplace: "Freelance Designer",
  education: "Faculty of Fine Arts",
  friendsCount: 1240,
  followersCount: 3500,
  joinDate: "September 2018",
  isVerified: true,
  language: 'en'
};