// Firebase & GitHub API Configuration for Brothers Club Cheeral

export const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "brothers-club-cheeral.firebaseapp.com",
  projectId: "brothers-club-cheeral",
  storageBucket: "brothers-club-cheeral.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

export const githubConfig = {
  owner: "brotherscheeral-spec",
  repo: "brothers-club-cheeral",
  branch: "main",
  folder: "images/gallery",
  get token() {
    return localStorage.getItem("gh_token") || "";
  },
  setToken(newToken) {
    if (newToken) {
      localStorage.setItem("gh_token", newToken.trim());
    }
  }
};
