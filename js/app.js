const FIXED_CAPTCHA = 'uhXu';
const STORAGE_KEY = 'hfi-admission-demo-result';
const TEACHERS = [
  'Joseph Hearn',
  'Joe',
  'Chloe',
  'Yoee Yang',
  'Antonio Mao',
  'Kevin Liu',
  'Forest Chen',
  'Aiden Chen',
  'Doit Liu',
  'Emma Xiao',
  'Jacek K Belc'
];

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function pickTwoTeachers() {
  const shuffled = [...TEACHERS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
}

function generateResult(name, ticket) {
  const [teacherA, teacherB] = pickTwoTeachers();
  const shortlist = Math.random() > 0.5 ? '是' : '否';
  const admission = shortlist === '是'
    ? (Math.random() > 0.5 ? '有条件录取' : '无条件录取')
    : '未录取';

  return {
    name,
    ticket,
    examDate: '2026年3月15日',
    english: randInt(0, 100),
    math: randInt(0, 100),
    shortlist,
    interview: shortlist === '是' ? randInt(0, 100) : '-',
    admission,
    note: `备注：恭喜您入围面试环节，你被分配到的老师是${teacherA}和${teacherB}，` +
      `<a href="guide.html" class="inline-guide-link">点击查看面试指南</a>`
  };
}

function saveResult(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadResult() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  } catch (error) {
    return null;
  }
}

function initLoginPage() {
  const form = document.getElementById('queryForm');
  if (!form) return;

  const captchaButton = document.getElementById('captchaButton');
  const formMessage = document.getElementById('formMessage');

  captchaButton.addEventListener('click', () => {
    formMessage.textContent = `固定验证码为：${FIXED_CAPTCHA}`;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('studentName').value.trim() || '未填写';
    const ticket = document.getElementById('ticketNo').value.trim() || '未填写';
    const captcha = document.getElementById('captchaInput').value.trim();

    if (captcha !== FIXED_CAPTCHA) {
      formMessage.textContent = '验证码错误，请重新输入。';
      return;
    }

    saveResult(generateResult(name, ticket));
    window.location.href = 'result.html';
  });
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setHtml(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

function initResultPage() {
  if (!document.getElementById('resultName')) return;

  const result = loadResult() || generateResult('未填写', '未填写');
  setText('resultName', result.name);
  setText('resultTicket', result.ticket);
  setText('englishScore', result.english);
  setText('mathScore', result.math);
  setText('interviewShortlist', result.shortlist);
  setText('interviewScore', result.interview);
  setText('admissionResult', result.admission);
  setHtml('noteText', result.note);
}

initLoginPage();
initResultPage();
