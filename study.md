# 공부한점



## 1. 웹팩 설정

- 웹팩이란?
  - 여러개 파일을 하나의 파일로 합쳐주는 번들러
  - 하나의 시작점(entry Point)로 부터 의존적인 모듈을 전부 찾아내서 하나의 결과물을 만들어 낸다
    - Entry : 어플리케이션의 진입점(ex) ./src/app.js)
    - Output : Entry에 추가한 main이 문자열로 들어오는 방식
- 로더란?
  - 웹팩은 모든 파일을 모듈로 바라보며 JS뿐만 아니라 css, image, font까지 전부 모듈로 보며 JS코드 안으로 가져올 수 있다.
  - 

## 2. 자바스크립트 로딩 시점에 따른 오류



## 3. 콜스택과 이벤트루프



## 4. 웹팩환경에서 디버깅



## 5. Routing과 Controller, View의 분할



## 6. Window.history.pushstate / window.history.popstate



## 7. arrow function 내 this



## 8. ESLINT와 PRETTIRE 적용법



## 9. Reducer가 순수함수인 이유

```javascript
function counter(state = initialState, action) { 
  switch(action.type) { 
    case types.INCREMENT: return { ...state, number: state.number + 1 }; 
    case types.DECREMENT: return { ...state, number: state.number - 1 }; 
    default: return state; 
  } 
}
```



- spread operator를 통해 기존의 state값을 복사한 뒤 number라는 항목으로 state반환
- redux의 변경 감지 알고리즘은 state가 변경됐는지를 검사하기 위해 state객체의 주소를 비교함.

