document.getElementById('continueBtn').addEventListener('click', () => {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('continueBtn').disabled = true;
  document.getElementById('continueBtn').textContent = 'Загрузка...';

  // Через 1.5 секунды — переход на profile.html
  setTimeout(() => {
    window.location.href = 'profile.html';
  }, 1500);
});
