//make sure is called
async function onSearchData(event) {
 
  event.preventDefault();
  
  const input = document.querySelector('#word-input');
  const word = input.value.trim();
  const results = document.querySelector('#database');
  const result = await fetch('/lookup/' + word);
  const json = await result.json();
  const resultWord = json.word;
  const associated = json.associated;
  var count = 0;
  if(associated.length != 0 && word.length!=0){

  for (let obj in associated){
    count++;
    var rowToAdd = ["","","","",""];
    rowToAdd[0] = associated[obj].markerName;

    rowToAdd[1] = associated[obj].biomarkerType;

    
    rowToAdd[2] = associated[obj].diseaseType;

    rowToAdd[3] = associated[obj].associatedDrug;

    rowToAdd[4] = associated[obj].medium;

    table.row.add(rowToAdd).draw();
    }
    console.log(count);

}
} 
var table = $('#testid').DataTable();
const searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', onSearchData);
