// 루틴 불러오기
let list = JSON.parse(localStorage.getItem('routines')) || [];

// 요소 선택
const input = document.getElementById('routine-input');
const ul = document.getElementById('routine-ul');
const bar = document.getElementById('progress');

// 루틴 저장
function save() {
  localStorage.setItem('routines', JSON.stringify(list));
}

// 진행률 업데이트
function update() {
  const total = list.length;
  const done = list.filter(r => r.checked).length;
  bar.textContent = total ? Math.round((done / total) * 100) + '%' : '0%';
}

// 루틴 렌더링
function render() {
  ul.innerHTML = '';
  list.forEach((r, i) => {
    const li = document.createElement('li');

    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.checked = r.checked;
    chk.addEventListener('change', () => {
      list[i].checked = chk.checked;
      save();
      update();
    });

    const txt = document.createElement('span');
    txt.textContent = r.text;
    if (r.checked) txt.style.textDecoration = 'line-through';

    const del = document.createElement('button');
    del.textContent = '삭제';
    del.addEventListener('click', () => {
      list.splice(i, 1);
      save();
      render();
      update();
    });

    li.append(chk, txt, del);
    ul.appendChild(li);
  });
  update();
}

// 루틴 추가 함수
function addRoutine() {
  const text = input.value.trim();
  if (!text) return;
  list.push({ text, checked: false });
  input.value = '';
  save();
  render();
}

// 로그아웃
function logout() {
  alert('로그아웃 되었습니다.');
  window.location.href = 'login.html';
}

// 페이지 로드 시 루틴 렌더링
render();
