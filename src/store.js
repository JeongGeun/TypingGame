class Store {
  constructor() {
    this.data = [];
    this.score = 0;
    this.second = 0; // 화면에 보여지는 시간
    this.state = 'Ready'; // 시작 / 초기화 버튼의 분기가 되는 변수
    this.isPassed = false; // 각 문제문제마다 pass/fail 여부를 알려주는 변수
    this.isPlaying = false; //모든 문제를 다 완료했는지 파악하는 변수 => 아직 게임 중이라면 true : 모든 문제를 완료해다면 false
    this.dataIndex = 0; // 데이터 배열의 index , 다음문제로 넘어가기 위해 필요한 변수
    this.avgTime = 0; // 평균 시간, complete화면으로 내보낼 변수
    this.typingTime = 0; // 한 문제를 맞추는 데 걸리는 시간
    this.targetTime = 0; // 서버에서 불러온 데이터 안에 각 문제마다 정해진 시간
  }

  initGame = () => {
    this.dataIndex = 0;
    this.avgTime = 0;
    this.typingTime = 0;
  };

  initTypingTime = () => {
    this.typingTime = 0;
  };

  // javascript 스펙 중 getter, setter가 있습니다.
  // https://mygumi.tistory.com/161
  // 좀더 사용하기 편할 꺼에요.
  setData = data => {
    this.data = data;
  };

  setScore = score => {
    this.score = score;
  };

  setState = state => {
    this.state = state;
  };

  setisPassed = isPassed => {
    this.isPassed = isPassed;
  };

  setisPlaying = isPlaying => {
    this.isPlaying = isPlaying;
  };

  setTargetTime = time => {
    this.targetTime = time;
  };

  setSecond = second => {
    this.second = second;
  };

  increaseAvgTime = time => {
    this.avgTime = this.avgTime + time;
  };

  increaseTypingTime = () => {
    this.typingTime = this.typingTime + 0.1;
  };

  increaseDataIndex = () => {
    this.dataIndex = this.dataIndex + 1;
  };

  decreaseScore = () => {
    this.score = this.score - 1;
  };

  decreaseSecond = () => {
    this.second = this.second - 0.1;
  };
  getData = () => this.data;
  getScore = () => this.score;
  getState = () => this.state;
  getSecond = () => this.second;
  getisPassed = () => this.isPassed;
  getisPlaying = () => this.isPlaying;
  getDataIndex = () => this.dataIndex;
  getAvgTime = () => this.avgTime;
  getTypingTime = () => this.typingTime;
  getTargetTime = () => this.targetTime;
}

export default Store;
