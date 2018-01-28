class Database {
  constructor(containerElement){
    this.containerElement = containerElement;
    var table = $('#testid').DataTable();

    this.message = document.querySelector('#result p');
    this.clearDatabase = this.clearDatabase.bind(this);
  }

  show(){
    this.containerElement.classList.remove('inactive');
    this.clearDatabase();

  }

  hide(){
    this.containerElement.classList.add('inactive');
    this.clearDatabase();
  }

  clearDatabase(){
    table.clear().draw();
  }

}
