"use strict";

window.onload = function() {

  const newTodoInput = document.querySelector('.new-todo');
  const todoList = document.querySelector('.todo-list');


// FONCTIONS
  function addItem(elt) {
    // On crée le newLi
      const newLi = document.createElement('li');
      newLi.classList.add('listItem');
      newLi.classList.add('cache');
      newLi.innerHTML =  `
        <input class="toggle" type="checkbox"/>
        <label> ${elt.value} </label>
        <button class="destroy"></button>
      `;

    // On insère le newLi au début de la todoList avec un slideDown
      todoList.insertBefore(newLi, todoList.childNodes[0]);
      setTimeout(function(){
        todoList.childNodes[0].classList.remove('cache');
      });

    // Vider le champ de texte
      elt.value = '';

  }


// CAPTURE DES EVENEMENTS
  newTodoInput.addEventListener('keyup', function(e){
    if (e.keyCode === 13) {
      addItem(this);
    }
  });


}
