'use strict'

let todoControl = document.querySelector('.todo-control')
let headerInput = document.querySelector('.header-input')
let todoList = document.querySelector('.todo-list')
let todoCompleted = document.querySelector('.todo-completed')
let headerButton = document.querySelector('.header-button')

let toDoData = []


const render = function(){
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''

    toDoData.forEach(function(item){
       const li =  document.createElement('li')
       li.classList.add('todo-item')
       li.innerHTML = '<span class="text-todo">' + item.text + '<div class="todo-buttons">' + '<button class="todo-remove">' + '</button>' + '<button class="todo-complete">' + '</button>' + '</div>' + '</span>'

       if(item.completed){
           todoCompleted.append(li)
       } else{
           todoList.append(li) 
       }

       li.querySelector('.todo-complete').addEventListener('click', function(){
           item.completed = !item.completed
           render()
           localStorage.setItem('Info', JSON.stringify(toDoData)) 
       })

       let toDoRemove = li.querySelector('.todo-remove')
       toDoRemove.addEventListener('click', function(){
           li.remove()
           if(item.presence = 'deleted'){
               toDoData.splice(item, 1)
            }
            localStorage.setItem('Info', JSON.stringify(toDoData))
        })
    })    
}




window.addEventListener('load', function(){
    let fromJSON = JSON.parse(localStorage.getItem('Info'))
    fromJSON = JSON.parse(localStorage.getItem('Info'))
    if(localStorage.getItem('Info')){
        fromJSON.forEach(function(el){
            toDoData.push(el) 
            render(el)
        })  
    }
})


todoControl.addEventListener('submit', function(e){
    e.preventDefault()
    const newToDo = {
        text: headerInput.value,
        completed: false,
    }
    
    toDoData.push(newToDo)
    headerInput.value = ''
    render()
    localStorage.setItem('Info', JSON.stringify(toDoData))  
})

headerInput.addEventListener('input', function(){
    let headerInputWithoutSpaces = headerInput.value.trim()
    if(!headerInputWithoutSpaces){
        headerButton.disabled = true  
    } else {
        headerButton.disabled = false
    }

})



