const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clrBtn = document.getElementById('clear');
const filter = document.getElementById('filter');

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
  li.appendChild(button);
  itemList.appendChild(li);
  itemInput.value = '';
  checkUI();
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

function removeAll(e) {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
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

function checkUI() {
  const items = document.querySelectorAll('li');
  if (items.length === 0) {
    filter.style.display = 'none';
    clrBtn.style.display = 'none';
  } else {
    filter.style.display = 'block';
    clrBtn.style.display = 'block';
  }
}

itemForm.addEventListener('submit', addItem);
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clrBtn.addEventListener('click', removeAll);
filter.addEventListener('input', filterItems);
checkUI();
