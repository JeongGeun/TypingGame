import ParentController from './parent-controller';

class HomeController extends ParentController{
    constructor(render){
        super(render)
        this.state = 'Ready';
        this.isPassed = false;
        this.isPlaying = false;
        this.dataIndex =0;
        this.avgTime = 0;
    }
    
    callRenderService = () =>{
        this.render.renderView();
        this.addHomeEvent();
        this.initializeGame();
    }

    getData = () =>{
        const url = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words';
        const config = {
            method: 'get',
        };
        fetch(url, config)
        .then(res => res.json())
        .then(data => this.setData(data))                
    }

    setData = (data) =>{
        this.data = data;
        this.render.setScore(data.length);
    }

    addHomeEvent = () =>{
        this.render.getStartBtnElement().addEventListener('click',this.startGame);
        this.render.getWordElement().addEventListener('keypress', this.checkMatch);
    };

    initializeGame = () =>{
        this.getData();
        this.render.initializeSecondAndWord();
        this.avgTime =0;
        this.dataIndex = 0;
    };
  
    startGame = () =>{
        this.initializeGame();

        if(this.state==='Ready'){
            this.state = 'Started';
            this.isPlaying = true;
            this.isPassed = false;
            this.render.showGameView(this.data[this.dataIndex]['second'],this.data[this.dataIndex]['text']);
            this.render.getWordElement().focus();
            this.startCountDown();
        } else {
            this.state = 'Ready';
            this.render.hideGameView();
            this.endCountDown();
        }
    };

    startCountDown = () =>{
        this.timeInterval = setInterval(this.countDown,1000);
    };

    endCountDown = () =>{
        clearInterval(this.timeInterval);
    };

    countDown = () =>{
        let sec = parseInt(this.render.getSecondElement().innerText);
        let score = parseInt(this.render.getScoreElement().innerText);

        if(!this.isPlaying){
            const success_time = score === 0 ? 0 : this.avgTime / score;
            this.endCountDown();
            const message = {
                score : score,
                time : success_time.toFixed(2)
            };
        
            this.route.changePath(message,'/complete');
            return;
        }

        sec>0 ? sec--: (this.isPassed=true);
        this.avgTime++;
        if(this.isPassed){
            if(sec==0){
                this.render.decreaseScore();

                this.dataIndex++;
                if(this.isFinish()) return;

                this.render.renderNextWordAndSecond(this.data[this.dataIndex]['second'],this.data[this.dataIndex]['text']);
            }
            this.isPassed = false;
        }
        else{
            this.render.decreaseSecond();
        }
    }
    checkMatch = (event) =>{
        if(event.keyCode===13){
            if(this.render.getWordElement().value===this.render.getTargetElement().innerText){
                this.isPassed=true;
                this.dataIndex++;
                if(this.isFinish()) return;
                this.render.renderNextWordAndSecond(this.data[this.dataIndex]['second'],this.data[this.dataIndex]['text']);
            }
            this.render.clearWords();
        }
    };

    isFinish = () => {
        if(this.dataIndex>=this.data.length){
            this.isPlaying = false;
            return true;
        }
        return false;
    };
}

export default HomeController;