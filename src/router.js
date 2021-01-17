import {CompleteView} from './complete'
import {home} from './home'
const CView=CompleteView
const HView=home

export const routes = {
    '/' : HView,
    '/complete' : CView
}

export function onNavigate(pathname,rootDiv) {
    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname
      )
      console.log(routes[pathname])
      rootDiv.innerHTML = routes[pathname]
}

window.onpopstate = (rootDiv) => {
    rootDiv.innerHTML = routes[window.location.pathname]
}

