class Result {

  constructor(containerElement){
    this.message = document.querySelector('#result p');
    var table = $('#testid').DataTable();
    this.containerElement = containerElement;
  }

  show(){

    this.containerElement.classList.remove('inactive');
  }

  hide(){

    this.containerElement.classList.add('inactive');
    table.clear().draw();
}


}
