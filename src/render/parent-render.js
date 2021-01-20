class ParentRender{
    constructor(view){
        this.view = view;
        this.app = document.getElementById('app');
    };

    renderInitView = () =>{
       this.app.innerHTML = this.view;
    };
};

export default ParentRender;