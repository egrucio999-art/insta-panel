const chats = [
  {user:"kate_dev",last:"скинула файлы, глянь",time:"2м",unread:true},
  {user:"max_stream",last:"го вечером",time:"1ч",unread:false},
  {user:"unknown_user",last:"есть разговор",time:"3ч",unread:true},
  {user:"igor_ops",last:"всё готово",time:"5ч",unread:false},
  {user:"phantom_node",last:"канал чистый",time:"1д",unread:false}
];
const panel = document.getElementById("chatsPanel");
chats.forEach(c => {
  const div = document.createElement("div");
  div.className = "chat" + (c.unread ? " unread" : "");
  div.innerHTML = `<div class="chat-avatar"><img src="img/avatar.jpg"></div><div class="chat-body"><div class="chat-name">${c.user}</div><div class="chat-last">${c.last}</div></div><div class="chat-time">${c.time}</div>`;
  panel.appendChild(div);
});
