import './index.css';
import Router, { routes, onNavigate } from './router';
import HomeController from './controller/home-controller';
import CompleteController from './controller/complete-controller';
import RenderCompleteView from './render/render-complete';
import RenderHomeView from './render/render-home';
import { HomeView } from './view/home';
import { CompleteView } from './view/complete';

// 전제척으로 코드 인덴트 및 함수 스타일도 다 다릅니다. prettier를 세팅하여 포맷팅을 맞춰주세요.
// 각 view의 controller를 여기서 다 하고 있습니다. 각 view를 제어하는 controller를 만들어서 분리를 한번 시도해보세요.

let state = 'Ready';
let isPassed = false;
let isPlaying = false;
let timeInterval;
let arr = [];
let arrnum = 0;
let avgTime = 0;

function init() {
  document.getElementById('second').innerText = '';
  document.getElementById('word').value = '';
  avgTime = 0;
  document.getElementById('startBtn').onclick = startGame;
  document.getElementById('word').addEventListener('keypress', checkMatch);
  getData();
}
function getData() {
  const url = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words';
  const config = {
    method: 'get',
  };
  fetch(url, config)
    .then(res => res.json())
    .then(data => setScore(data));
}

function setScore(data) {
  const score = document.getElementById('totalScore');
  score.innerText = data.length;
  arr = [];
  arrnum = arr.length;
  data.forEach(element => {
    arr.push(element);
  });
}

function startGame() {
  const division1 = document.getElementById('division1');
  const division2 = document.getElementById('division2');
  const startBtn = document.getElementById('startBtn');

  init();

  if (state === 'Ready') {
    state = 'Started';
    division1.style.display = 'none';
    division2.style.display = 'block';
    startBtn.innerText = '초기화';

    run(arr[arrnum]['second'], arr[arrnum]['text']);
  } else {
    state = 'Ready';
    division1.style.display = 'block';
    division2.style.display = 'none';
    startBtn.innerText = '시작';
    clearInterval(timeInterval);
  }
}

function run(time, text) {
  isPlaying = true;
  isPassed = false;
  document.getElementById('word').focus();
  document.getElementById('second').innerText = time;
  document.getElementById('target').innerText = text;
  timeInterval = setInterval(countDown, 1000);
}

function countDown() {
  let sec = parseInt(document.getElementById('second').innerText);
  const score = document.getElementById('totalScore');
  const app = document.getElementById('app');

  if (!isPlaying) {
    clearInterval(timeInterval);
    const success_time = parseInt(score.innerText) === 0 ? 0 : avgTime / parseInt(score.innerText);
    const data = {
      score: score.innerText,
      time: success_time.toFixed(2),
    };
    onNavigate(data, '/complete', app);
    return;
  }

  sec > 0 ? sec-- : (isPassed = true);
  avgTime++;
  if (isPassed) {
    if (sec === 0) {
      score.innerText = parseInt(score.innerText) - 1;
      arrnum++;
      if (arrnum >= arr.length) {
        isPlaying = false;
        return;
      }
      document.getElementById('second').innerText = arr[arrnum]['second'];
      document.getElementById('target').innerText = arr[arrnum]['text'];
    }
    isPassed = false;
  } else {
    document.getElementById('second').innerText = sec;
  }
}

function checkMatch(event) {
  if (event.keyCode === 13) {
    const word = document.getElementById('word');
    const target = document.getElementById('target');

    if (word.value === target.innerText) {
      isPassed = true;
      arrnum++;
      if (arr.length <= arrnum) {
        isPlaying = false;
        return;
      }
      document.getElementById('second').innerText = arr[arrnum]['second'];
      document.getElementById('target').innerText = arr[arrnum]['text'];
      word.value = '';
    } else {
      word.value = '';
    }
  }
}


window.onpageshow = () => {
  //const app = document.getElementById('app');

  // routes object에 직접 접근해서 view를 가져오기 보다 router에 view를 가져오는 함수를 마련해서 하는게 좋을 듯합니다.
  // pathname에 routes에 정의되지 않는 pathname이 오는 경우는 undefined를 표시합니다,
  //app.innerHTML = routes[window.location.pathname];
  //init();
  const renderHome = new RenderHomeView(HomeView);
  const homeController = new HomeController(renderHome);

  const renderComplete =new RenderCompleteView(CompleteView);
  const completeController =new CompleteController(renderComplete);
  
  const route = new Router({
    '/' : homeController,
    '/complete' : completeController
  });

  route.onNavigate();

};

window.onpopstate = () => {
  app.innerHTML = routes[window.location.pathname]
  init();
};
