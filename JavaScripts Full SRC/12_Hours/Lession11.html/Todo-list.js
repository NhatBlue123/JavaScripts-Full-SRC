const toDoList = [{
    name: 'An Sang',
    dueDate: '2024-04-08',
 },
  {
     name: 'An Trua',
    dueDate: '2024-04-08', 
  }];
 update();
function clickAdd()
{
 const inputTODO = document.querySelector('.input-todo').value;
 const inputDATE = document.querySelector('.input-date').value;
 if(inputTODO === '' || inputDATE === '')
 {
     alert('Please enter the value');
     return;
 }
 else
 {
 toDoList.push({
     name: inputTODO,
     dueDate: inputDATE
 });
 document.querySelector('.input-todo').value = '';
 update();
}
}        
function update()
{
 let todoListHTML = '';
 for(let i = 0 ; i < toDoList.length; i++)
 {
    const todo = toDoList[i];
    const name = todo.name;
    const date = todo.dueDate;
    let html = `<div>${name}</div> 
                <div>${date}</div> 
                <button class="delete-button" onclick="toDoList.splice(${i},${1});
                update()">Delete</button>`;
    todoListHTML += html;
 }
 document.querySelector('.list-todo').innerHTML = todoListHTML;
 console.log(todoListHTML);
}