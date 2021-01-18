import { CompleteView } from './complete';
import { home } from './home';
const CView = CompleteView;
const HView = home;

export const routes = {
  '/': HView,
  '/complete': CView,
};

export function onNavigate(data, pathname, rootDiv) {
  window.history.pushState(data, pathname, window.location.origin + pathname);
  rootDiv.innerHTML = routes[pathname];
  // setCompleteView는 완료화면에만 속하는 기능이기 때문에 router에 위치하기 보다는 해당 view에 위치하는게 좋을 듯합니다.
  if (pathname === '/complete') setCompleteView(data['score'], data['time']);
}

function setCompleteView(score, time) {
  document.getElementById('ctotalScore').innerText = score;
  document.getElementById('avgTime').innerText = time;
  document.getElementById('restart').addEventListener('click', function () {
    history.back();
  });
}
