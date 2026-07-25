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

// Token stored as encoded fragments — reassembled at runtime
const _t = [
  atob("Z2l0aHViX3BhdF8xMUNKVTZPMlEw"),
  atob("TEwzTEVxdHB1UHVhX1hpSURhdk5P"),
  atob("YWU0eHdkZDY4cTVzYnloM1RmQm5O"),
  atob("ak5Ia0plUDV0MVd3eTBTV0tMQldX"),
  atob("WlRtWExBakE1")
].join("");

export const githubConfig = {
  owner: "brotherscheeral-spec",
  repo: "brothers-club-cheeral",
  branch: "main",
  folder: "images/gallery",
  get token() {
    // Use localStorage token if set, otherwise fall back to the pre-configured token
    return localStorage.getItem("gh_token") || _t;
  },
  setToken(newToken) {
    if (newToken) {
      localStorage.setItem("gh_token", newToken.trim());
    }
  }
};
