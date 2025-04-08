const input = document.getElementById("input");
const add_task_btn = document.getElementById('add_task_btn');
let records = document.getElementById('records');
const search_bar = document.querySelector('.search_bar');
let taskArray = [];

add_task_btn.addEventListener('click', add_task_to_array);
input.addEventListener('keydown', function(event){
      if (event.keyCode === 13){
            add_task_to_array();}    
});

// ============== Save Tasks ========
function saveInfo(taskArray){
      let stringTask = JSON.stringify(taskArray)
      localStorage.setItem('id', stringTask)
      // let objTask = localStorage.getItem('id')
      // if(objTask!=null){
      // taskArray = JSON.parse(objTask); 
      // }
      displaytask();
}
let storedTasks = localStorage.getItem('id');
if(storedTasks){
   // storedTasks = '';
  taskArray = JSON.parse(storedTasks);
  displaytask();
}

function add_task_to_array(){
      const task = input.value;
      if(task!==''){
      //   taskArray.push({'task': task});
      const dateAdded = new Date().toLocaleDateString();  // full date 
      taskArray.push({todo: task, date: dateAdded });
      }else{
        alert("Please Enter You Task")
      }
      saveInfo(taskArray)
      input.value = '';
}

// ============== Diplay Task, Edit and Delete ========
function displaytask(){
      let statement = '';
      taskArray.forEach((elm, key)=>{
            statement += `<tr>
            <td>${key + 1}  )</td>
      
            <td class="task-text">${elm.todo}</td>

            <td class="icons">
              <i class="ri-edit-line edit_icon"></i>
              <i class="ri-save-line save_icon"></i>
              <i class="ri-delete-bin-6-line dlt_icon"></i>
            </td>
      
            <td>${elm.date}</td>
          </tr>`;
      })
      records.innerHTML = statement;

// // ============== Edit ================
const edit_icon = document.querySelectorAll(".edit_icon");
edit_icon.forEach((btn, index)=>{
      btn.addEventListener("click", function(){
        const row = this.closest('tr');
        const cellData = row.querySelector('.task-text');
        const input = document.createElement("input");
        input.value = cellData.textContent;
        cellData.textContent = '';
        cellData.appendChild(input);

        this.style.display = "none";
        row.querySelector(".save_icon").style.display = 'inline-block';
        row.querySelector(".dlt_icon").style.display = 'none';
      });
      
});
// ================= Save updated data ================ 
const save_icon = document.querySelectorAll(".save_icon");
save_icon.forEach((btn,index)=>{ 
      // forEach will run for every button and collect index of every button
      btn.addEventListener("click", function(){
            const row = this.closest('tr');
            const cellData = row.querySelector('.task-text');
            const input = cellData.querySelector("input");
            const updatedValue = input.value;
            taskArray[index].todo = updatedValue;
            saveInfo(taskArray);

            this.style.display = "none";
            row.querySelector(".edit_icon").style.display = 'inline-block';
            
      });

})
// ============== Delete ===============
const delete_task = document.querySelectorAll('.dlt_icon');
delete_task.forEach((btn, index) =>{
      btn.addEventListener("click", function(){
            taskArray.splice(index, 1)
            saveInfo(taskArray)
      //   const row = this.closest('tr');
      //   localStorage.removeItem(row); 
      //   row.remove();
      });
});
}
// =================== Search Bar ==================

search_bar.addEventListener('input', function(e){
     let search_str = e.target.value.toLowerCase();
     //e.target tell us; kha pr activity ho rahi hai => (e.target = search input element)
     const all_tr = document.querySelectorAll('#records tr');
     records.innerHTML = '';
     all_tr.forEach(tr=>{
     const td_in_tr = tr.querySelectorAll('td');
     if(td_in_tr[1].innerText.toLowerCase().indexOf(search_str) > -1){
      // .indexOf => ye batata hai ki kya td_in_tr[1] mai  search text exist krta hai 
      records.appendChild(tr);
     }
     })
     if(records.innerHTML == ''){
      records.innerHTML = 'No record found'
     }
})