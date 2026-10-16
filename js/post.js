let liked = false;
const sampleComments = [
  {user:"kate_dev",text:"охуенно, брат!",time:"2ч",likes:12},
  {user:"max_stream",text:"го ещё &#128293;",time:"5ч",likes:3},
  {user:"unknown_user",text:"это пиздец как круто",time:"1д",likes:8},
  {user:"igor_ops",text:"красиво",time:"2д",likes:5}
];
function openPost(id) {
  liked = false;
  document.getElementById("modalImg").src = `img/posts/${id}.jpg`;
  document.getElementById("modalHeart").classList.remove("liked");
  document.getElementById("modalHeart").innerHTML = `<svg aria-label="Уведомления" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Уведомления</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>`;
  const likes = Math.floor(Math.random()*2000)+100;
  document.getElementById("modalLikes").textContent = likes.toLocaleString("ru-RU") + " отметок «Нравится»";
  document.getElementById("modalDate").textContent = `${Math.floor(Math.random()*30)+1} часов назад`;
  const commentsEl = document.getElementById("modalComments");
  commentsEl.innerHTML = "";
  sampleComments.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `<div class="comment-avatar"><img src="img/avatar.jpg"></div><div class="comment-body"><div><span class="username">${c.user}</span><span class="text">${c.text}</span></div><div class="meta"><span>${c.time}</span><span>${c.likes} отметок «Нравится»</span><span>Ответить</span></div></div>`;
    commentsEl.appendChild(div);
  });
  document.getElementById("postModal").classList.add("active");
}
function closePost() { document.getElementById("postModal").classList.remove("active"); }
function toggleLike() {
  liked = !liked;
  const heart = document.getElementById("modalHeart");
  heart.classList.toggle("liked", liked);
  heart.innerHTML = liked ? `<svg aria-label="Уведомления" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Уведомления</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>` : `<svg aria-label="Уведомления" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Уведомления</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>`;
}
function addComment() {
  const input = document.getElementById("commentInput");
  const text = input.value.trim();
  if (!text) return;
  const commentsEl = document.getElementById("modalComments");
  const div = document.createElement("div");
  div.className = "comment";
  div.innerHTML = `<div class="comment-avatar"><img src="img/avatar.jpg"></div><div class="comment-body"><div><span class="username">og_ruber</span><span class="text">${text}</span></div><div class="meta"><span>только что</span><span>0 отметок</span></div></div>`;
  commentsEl.appendChild(div);
  commentsEl.scrollTop = commentsEl.scrollHeight;
  input.value = "";
}
document.getElementById("postModal").addEventListener("click", (e) => { if (e.target.id === "postModal") closePost(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePost(); });
