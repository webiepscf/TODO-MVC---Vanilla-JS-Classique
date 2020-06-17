"use strict";

window.onload = function() {

// ELEMENTS UTILES
  const newTodoInput = document.querySelector('.new-todo');
  const todoList = document.querySelector('.todo-list');
  const todoCountElt = document.getElementById('todo-count');



// FONCTIONS

/**
 * [addItem description]
 * @param {[type]} elt [description]
 */
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

    // Lancement des fonctions utiles
      displayNotCompleted();

  }

  function displayNotCompleted () {
    todoCountElt.innerText = todoList.querySelectorAll('li:not(.completed)').length;
  }



// CAPTURE DES EVENEMENTS
  newTodoInput.addEventListener('keyup', function(e){
    if (e.keyCode === 13) {
      addItem(this);
    }
  });


// LANCEMENT DE FONCTIONS AU CHARGEMENT DE LA PAGE
  displayNotCompleted();

}
