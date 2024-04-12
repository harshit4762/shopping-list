const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === '') {
    alert('Please add item name.');
  }

  const li = document.createElement('li');
  const button = document.createElement('button');
  button.className = 'remove-item btn-link text-red';
  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-xmark';
  button.appendChild(icon);
  li.appendChild(document.createTextNode(newItem));
  li.appendChild(document.createTextNode(button));
}

itemForm.addEventListener('submit', addItem);

function addItem(e) {
  e.preventDefault();

  // Validate input
  if (itemInput.value === '') {
    alert('Please enter an item');
    return;
  }

  console.log('Success');
}

itemForm.addEventListener('submit', addItem);
