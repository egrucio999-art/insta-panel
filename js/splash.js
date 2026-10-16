document.getElementById('continueBtn').addEventListener('click', () => {
  const btn = document.getElementById('continueBtn');
  const loading = document.getElementById('loading');

  btn.disabled = true;
  btn.textContent = 'Загрузка...';
  loading.style.display = 'block';
  loading.textContent = 'Проверка сессии...';

  setTimeout(() => {
    loading.textContent = 'Загрузка профиля...';
  }, 700);

  setTimeout(() => {
    loading.textContent = 'Синхронизация данных...';
  }, 1300);

  setTimeout(() => {
    window.location.href = 'profile.html';
  }, 1800);
});
