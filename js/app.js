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
      activerCheckboxes();
      activerItems();
      activerDeleteBtns();

  }

/**
 * [displayNotCompleted description]
 * @return {[type]} [description]
 */
  function displayNotCompleted () {
    todoCountElt.innerText = todoList.querySelectorAll('li:not(.completed)').length;
  }

/**
 * [toggleItem description]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
  function toggleItem (item) {
    // item correspond au <li>
      item.classList.toggle('completed');
      displayNotCompleted();
  }

/**
 * [editItem description]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
  function editItem(item) {
    // item correspond au <li>
      const value = item.querySelector('label').innerText;
      item.querySelector('label').innerHTML = `<input type="text" value="${value}" class="editInput" />`;
      // Je mets le curseur dans le nouvel input
      item.querySelector('label input').focus();
      activerEditInputs();
  }

/**
 * [updateItem description]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
  function updateItem(item) {
    // item correspond au <li>
      item.querySelector('label').innerHTML = item.querySelector('label > input').value;
  }

/**
 * [deleteItem description]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
  function deleteItem(item) {
    // item correspond au <li>
      item.classList.add('cache');
      setTimeout(function() {
        item.remove();
        displayNotCompleted();
      }, 300);
  }

/**
 * [filterItems description]
 * @param  {[type]} filterBtn [description]
 * @return {[type]}           [description]
 */
  function filterItems(filterBtn) {
    const filter = filterBtn.dataset.filter; // .all, .completed, :not(.completed)
    const items = document.querySelectorAll('.listItem');
    for (let item of items) {
      if (item.matches(filter)) {
        item.classList.remove('cache');
      }
      else {
        item.classList.add('cache');
      }
    }
  }

  function deleteAllCompleted() {
    const itemsCompleted = document.querySelectorAll('.completed');
    for (let itemCompleted of itemsCompleted) {
      deleteItem(itemCompleted);
    }
  }


// CAPTURE DES EVENEMENTS

// Lorsque l'on tape 'Enter' dans le champ de texte .new-todo
  newTodoInput.addEventListener('keyup', function(e){
    if (e.keyCode === 13) {
      addItem(this);
    }
  });

// Lorsque l'on clique sur une checkbox .toggle
  function activerCheckboxes() {
    const toggleInputs = document.querySelectorAll('.toggle');
    for (let toggleInput of toggleInputs) {
      toggleInput.onclick = function() {
        toggleItem(this.closest('li'));
      }
    }
  }

// Lorsque l'on double-clique sur un label qui est dans un .listItem:not(.completed)
  function activerItems() {
    const itemsNotCompleted = todoList.querySelectorAll('.listItem:not(.completed) label');
    for (let itemNotCompleted of itemsNotCompleted) {
      itemNotCompleted.ondblclick = function () {
        editItem(this.closest('li'));
      }
    }
  }

// Lorsque je tape 'Enter' dans un input.editInput
function activerEditInputs() {
  const editInputs = document.querySelectorAll('.editInput');
  for (let editInput of editInputs) {
    editInput.onkeyup = function(e) {
      if (e.keyCode === 13) {
        updateItem(this.closest('li'));
      }
    }
    editInput.onblur = function() {
      updateItem(this.closest('li'));
    }
  }
}

// Lorsque l'on clique sur un bouton .destroy
  function activerDeleteBtns() {
    const deleteBtns = document.querySelectorAll('.destroy');
    for (let deleteBtn of deleteBtns) {
      deleteBtn.onclick = function() {
        deleteItem(this.closest('li'));
      }
    }
  }

// Lorsque l'on clique sur un .filter
  const filterBtns = document.querySelectorAll('.filter');
  for (let filterBtn of filterBtns) {
    filterBtn .onclick = function () {
      filterItems(this);
    }
  }

// Lorsque l'on clique sur le .clear-completed
  document.querySelector('.clear-completed').onclick = function () {
    deleteAllCompleted();
  }




// LANCEMENT DE FONCTIONS AU CHARGEMENT DE LA PAGE
  displayNotCompleted();
  activerCheckboxes();
  activerItems();
  activerDeleteBtns()

}
