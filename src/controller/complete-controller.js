import ParentController from './parent-controller';

class CompleteController extends ParentController{
    constructor(render){
        super(render);
    }

    callRenderService=()=>{
        console.log(this.route)
        this.render.renderView();
        this.addCompleteEvent();
    }

    addCompleteEvent = () =>{
        this.render.getRestartBtn().addEventListener('click',this.wayTogoHome);
    };
    wayTogoHome = () =>{
        this.route.changePath({},'/');
    };
}

export default CompleteController;