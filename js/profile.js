const highlights = ["GAMEKIDS","LEVEL UP","PRO GRIND","GIRLS UP","GAMEUP","BOYS CLUB","FOOTY LAB"];
const hlContainer = document.getElementById("highlights");
highlights.forEach((label, i) => {
  const div = document.createElement("div");
  div.className = "highlight";
  div.innerHTML = `<div class="circle"><img src="img/posts/${i+1}.jpg" onerror="this.style.display=\x27none\x27"></div><div class="label">${label}</div>`;
  hlContainer.appendChild(div);
});
const grid = document.getElementById("grid");
for (let i = 1; i <= 29; i++) {
  const div = document.createElement("div");
  div.className = "grid-item";
  div.innerHTML = `<img src="img/posts/${i}.jpg" onerror="this.style.display=\x27none\x27"><div class="overlay"><span>&#9825; ${Math.floor(Math.random()*2000)+100}</span><span>&#128172; ${Math.floor(Math.random()*200)+10}</span></div>`;
  div.addEventListener("click", () => openPost(i));
  grid.appendChild(div);
}
const tabs = document.querySelectorAll(".tab");
const panels = { posts: grid, reels: document.getElementById("reelsPanel"), tagged: document.getElementById("taggedPanel"), chats: document.getElementById("chatsPanel") };
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    Object.values(panels).forEach(p => p.classList.remove("active"));
    const name = tab.dataset.tab;
    if (name === "posts") { grid.style.display = "grid"; }
    else { grid.style.display = "none"; const p = panels[name]; if (p) p.classList.add("active"); }
  });
});
