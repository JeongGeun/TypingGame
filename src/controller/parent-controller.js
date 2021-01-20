class ParentController {
  constructor(render) {
    this.render = render;
  }

  setRoute = route => {
    this.route = route;
  };
}

export default ParentController;
