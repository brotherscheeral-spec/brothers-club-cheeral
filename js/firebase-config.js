// Firebase & GitHub API Configuration for Brothers Club Cheeral

export const firebaseConfig = {
  apiKey: "AIzaSyDWPGbhTJzKWQDcsh5uLBAHJzuST0reSl8",
  authDomain: "brothers-club-cheeral.firebaseapp.com",
  projectId: "brothers-club-cheeral",
  storageBucket: "brothers-club-cheeral.firebasestorage.app",
  messagingSenderId: "480162983934",
  appId: "1:480162983934:web:589d6d5ea928fb37b79aaf",
  measurementId: "G-88GF1R58VV"
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
