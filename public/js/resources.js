class Resources {
  constructor(containerElement){
    this.containerElement = containerElement;
  }

  show(){
    this.containerElement.classList.remove('inactive');

  }

  hide(){
    this.containerElement.classList.add('inactive');
    
  }



}