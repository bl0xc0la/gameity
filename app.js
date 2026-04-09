import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
  collection, addDoc, getDocs, doc, setDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const authDiv = document.getElementById("auth");
const appDiv = document.getElementById("app");
const content = document.getElementById("content");
const adminBtn = document.getElementById("adminBtn");

window.register = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const user = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", user.user.uid), {
    email,
    friends: [],
    isAdmin: false
  });
};

window.login = async () => {
  await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
};

window.logout = () => signOut(auth);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    authDiv.style.display = "none";
    appDiv.style.display = "block";

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.data().isAdmin) {
      adminBtn.style.display = "block";
    }

    loadGames();
  } else {
    authDiv.style.display = "block";
    appDiv.style.display = "none";
  }
});

window.loadGames = async () => {
  content.innerHTML = "<h2>Games</h2>";

  const querySnapshot = await getDocs(collection(db, "games"));
  querySnapshot.forEach(doc => {
    const game = doc.data();
    content.innerHTML += `<div class="card">${game.title}</div>`;
  });
};

window.loadFriends = () => {
  content.innerHTML = "<h2>Friends (coming soon)</h2>";
};

window.loadDMs = async () => {
  content.innerHTML = `
    <h2>DMs</h2>
    <input id="msg">
    <button onclick="sendDM()">Send</button>
    <div id="messages"></div>
  `;

  const snapshot = await getDocs(collection(db, "messages"));
  snapshot.forEach(doc => {
    document.getElementById("messages").innerHTML += `<p>${doc.data().text}</p>`;
  });
};

window.sendDM = async () => {
  const msg = document.getElementById("msg").value;
  await addDoc(collection(db, "messages"), {
    text: msg,
    uid: auth.currentUser.uid
  });
};

window.loadAdmin = () => {
  content.innerHTML = `
    <h2>Admin Panel</h2>
    <button onclick="addGame()">Add Game</button>
  `;
};

window.addGame = async () => {
  const title = prompt("Game name?");
  await addDoc(collection(db, "games"), { title });
};
