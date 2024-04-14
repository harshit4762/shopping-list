const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clrBtn = document.getElementById('clear');
const filter = document.getElementById('filter');
let isEditMode = false;
const formBtn = itemForm.querySelector('button');

function displayItems() {
  const itemsFromStorage = getItemFromStorage();

  itemsFromStorage.forEach((item) => addItemToDOM(item));

  checkUI();
}

function submitItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please add item name.');
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  }

  if (checkIfItemExists(newItem)) {
    alert('Item already exists.');
    return;
  }

  addItemToDOM(newItem);
  addItemToStorage(newItem);

  itemInput.value = '';

  checkUI();
}

function addItemToDOM(item) {
  const li = document.createElement('li');

  const button = document.createElement('button');
  button.className = 'remove-item btn-link text-red';

  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-xmark';

  button.appendChild(icon);
  li.appendChild(document.createTextNode(item));
  li.appendChild(button);
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemFromStorage();

  itemsFromStorage.push(item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemFromStorage(item) {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((entry) => entry.classList.remove('edit-mode'));

  item.classList.add('edit-mode');

  formBtn.innerHTML = '<i class= "fa-solid fa-pen"></i>Update Item';
  formBtn.style.backgroundColor = '#228B22';

  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    item.remove();
    removeItemFromStorage(item.textContent);
    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeAll(e) {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }

  localStorage.removeItem('items');

  checkUI();
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = document.querySelectorAll('li');

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemFromStorage();

  return itemsFromStorage.includes(item);
}

function checkUI() {
  itemInput.value = '';
  const items = document.querySelectorAll('li');

  if (items.length === 0) {
    filter.style.display = 'none';
    clrBtn.style.display = 'none';
  } else {
    filter.style.display = 'block';
    clrBtn.style.display = 'block';
  }

  formBtn.style.backgroundColor = '#333';
  formBtn.style.innerHTML = '<i class="fa-solid fa-plus"></i>Add Item';
  isEditMode = false;
}

//Initialize App
function init() {
  itemForm.addEventListener('submit', submitItem);
  itemList.addEventListener('click', onClickItem);
  clrBtn.addEventListener('click', removeAll);
  filter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();
