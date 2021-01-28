import { Word } from './type';

class Store {
  private _data: Word[];
  private _score: number;
  private _second: number;
  private _state: string;
  private _isPassed: boolean;
  private _isPlaying: boolean;
  private _dataIndex: number;
  private _avgTime: number;
  private _typingTime: number;
  private _targetTime: number;

  constructor() {
    this._data = [];
    this._score = 0;
    this._second = 0; // 화면에 보여지는 시간
    this._state = 'Ready'; // 시작 / 초기화 버튼의 분기가 되는 변수
    this._isPassed = false; // 각 문제문제마다 pass/fail 여부를 알려주는 변수
    this._isPlaying = false; //모든 문제를 다 완료했는지 파악하는 변수 => 아직 게임 중이라면 true : 모든 문제를 완료해다면 false
    this._dataIndex = 0; // 데이터 배열의 index , 다음문제로 넘어가기 위해 필요한 변수
    this._avgTime = 0; // 평균 시간, complete화면으로 내보낼 변수
    this._typingTime = 0; // 한 문제를 맞추는 데 걸리는 시간
    this._targetTime = 0; // 서버에서 불러온 데이터 안에 각 문제마다 정해진 시간
  }

  initGame = () => {
    this._dataIndex = 0;
    this._avgTime = 0;
    this._typingTime = 0;
  };

  initTypingTime = () => {
    this._typingTime = 0;
  };

  // javascript 스펙 중 getter, setter가 있습니다.
  // https://mygumi.tistory.com/161
  // 좀더 사용하기 편할 꺼에요.
  set data(data) {
    this._data = data;
  }

  set score(score: number) {
    this._score = score;
  }

  set state(state: string) {
    this._state = state;
  }

  set isPassed(isPassed: boolean) {
    this._isPassed = isPassed;
  }

  set isPlaying(isPlaying: boolean) {
    this._isPlaying = isPlaying;
  }

  set targetTime(time: number) {
    this._targetTime = time;
  }

  set second(second: number) {
    this._second = second;
  }

  increaseAvgTime = (time: number) => {
    this._avgTime = this._avgTime + time;
  };

  increaseTypingTime = () => {
    this._typingTime = this._typingTime + 0.1;
  };

  increaseDataIndex = () => {
    this._dataIndex = this._dataIndex + 1;
  };

  decreaseScore = () => {
    this._score = this._score - 1;
  };

  decreaseSecond = () => {
    this._second = this._second - 0.1;
  };
  get data():Word[] {
    return this._data;
  }
  get score():number {
    return this._score;
  }
  get state():string {
    return this._state;
  }
  get second():number {
    return this._second;
  }
  get isPassed():boolean {
    return this._isPassed;
  }
  get isPlaying():boolean {
    return this._isPlaying;
  }
  get dataIndex():number {
    return this._dataIndex;
  }
  get avgTime() :number{
    return this._avgTime;
  }
  get typingTime():number {
    return this._typingTime;
  }
  get targetTime():number {
    return this._targetTime;
  }
}

export default Store;
