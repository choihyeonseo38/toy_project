document.getElementById('login-btn').addEventListener('click', () => {
  const usernameInput = document.getElementById('username-input').value.trim();

  if (usernameInput) {
    localStorage.setItem('username', usernameInput);
    window.location.href = 'index.html';
  } else {
    alert('이름을 입력해주세요!');
  }
});
