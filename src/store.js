class Store { 
    constructor() { 
        this.data = []
        this.state = 'Ready'; // 시작 / 초기화 버튼의 분기가 되는 변수
        this.isPassed = false; // 각 문제문제마다 pass/fail 여부를 알려주는 변수
        this.isPlaying = false; //모든 문제를 다 완료했는지 파악하는 변수 => 아직 게임 중이라면 true : 모든 문제를 완료해다면 false
        this.dataIndex = 0; // 데이터 배열의 index , 다음문제로 넘어가기 위해 필요한 변수
        this.avgTime = 0; // 평균 시간, complete화면으로 내보낼 변수
        this.typingTime = 0; // 한 문제를 맞추는 데 걸리는 시간
        this.targetTime = 0; // 서버에서 불러온 데이터 안에 각 문제마다 정해진 시간
    };

}