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

// Default PAT — hardcoded so no prompt is ever needed
const _DEFAULT_GH_TOKEN = "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";

export const githubConfig = {
  owner: "brotherscheeral-spec",
  repo: "brothers-club-cheeral",
  branch: "main",
  folder: "images/gallery",
  get token() {
    // Use localStorage token if set, otherwise fall back to the hardcoded default
    return localStorage.getItem("gh_token") || _DEFAULT_GH_TOKEN;
  },
  setToken(newToken) {
    if (newToken) {
      localStorage.setItem("gh_token", newToken.trim());
    }
  }
};
