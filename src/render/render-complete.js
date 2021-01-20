import ParentRender from './parent-render';

class RenderCompleteView extends ParentRender{
    constructor(view){
        super(view);
    }

    renderView = () =>{
        this.renderInitView();
        this.declareHTMLelement();
        this.setCompleteView();
    }

    declareHTMLelement = () =>{
        this.restartBtn = document.getElementById('restart');
        this.ctotalScore = document.getElementById('ctotalScore');
        this.avgTime = document.getElementById('avgTime');
    };

    setCompleteView = () =>{
        this.ctotalScore.innerText = window.history.state['score'];
        this.avgTime.innerText = window.history.state['time'];
    };
    getRestartBtn = () => this.restartBtn;
}

export default RenderCompleteView;