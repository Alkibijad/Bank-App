let sections = document.querySelectorAll("section");
let buttons = document.querySelectorAll(".button");
let submit = document.querySelector(".submit");

let firstName = document.querySelector("[name = first_name]");
let lastName = document.querySelector("[name = last_name]");
let deposit = document.querySelector("[name = deposit]");
let card = document.querySelector("[name = card]");

submit.addEventListener("click", validateForm);

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", changeView);
}

function changeView() {
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }

  let clickedButton = this.getAttribute("view");
  let currentView = document.querySelector(
    "section[view = " + clickedButton + "]"
  );
  currentView.style.display = "block";

  if (clickedButton === "view-accounts") {
    displayAccounts();
  } else if (clickedButton === "view-edit-delete-account") {
    editDeleteAccount();
  }
}
function displayAccounts() {
  let accounts = document.querySelector(".accounts-body");
  let text = "";
  for (let i = 0; i < db.length; i++) {
    text += `<tr>
      <th scope="row" >${i + 1}</th>
      <td>${db[i].id}</td>
      <td>${db[i].first_Name}</td>
      <td>${db[i].last_Name}</td>
      <td>${db[i].deposit}</td>
      <td>${db[i].card}</td>
      `;
  }
  accounts.innerHTML = text;
}
function validateForm() {
  let errors = 0;
  if (firstName.value.length < 3) {
    firstName.style.border = "1px solid red";
    firstName.value = "Plase enter a valid name";
    errors++;
    firstName.addEventListener("click", function () {
      firstName.value = "";
      firstName.style.border = "none";
    });
  }

  if (lastName.value.length < 3) {
    lastName.style.border = "1px solid red";
    lastName.value = "Plase enter a valid name";
    errors++;
    lastName.addEventListener("click", function () {
      lastName.value = "";
      lastName.style.border = "none";
    });
  }

  if (deposit.value.length < 3) {
    deposit.style.border = "1px solid red";
    deposit.value = "Plase enter a valid name";
    errors++;
    deposit.addEventListener("click", function () {
      deposit.value = "";
      deposit.style.border = "none";
    });
  }

  if (card.value.length < 3) {
    card.style.border = "1px solid red";
    card.value = "Plase enter a valid name";
    errors++;
    card.addEventListener("click", function () {
      card.value = "";
      card.style.border = "none";
    });
  }

  if (errors === 0) {
    submitForm();
  }
}

function createID() {
  let usedIds = [0];
  let id = Math.floor(Math.random() * 1000000);

  for (let i = 0; i < usedIds.length; i++) {
    // ovde sam namerno stavio jedan
    if (usedIds[i] === id) {
      // createID();
      // console.log("prva radi");
    } else {
      // console.log("druga radi");
      usedIds.push(id);
      // console.log(usedIds);
    }
  }
  return id;
}

function submitForm() {
  db.push({
    id: createID(),
    first_Name: firstName.value,
    last_Name: lastName.value,
    deposit: deposit.value,
    card: card.value,
  });
  resetInputs();
}

function resetInputs() {
  let inputs = document.querySelectorAll(".addNewAccountDetails");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}
function editDeleteAccount() {
  let accounts = document.querySelector(".edit-accounts-body");
  let text = "";
  for (let i = 0; i < db.length; i++) {
    text += `<tr>
      <th scope="row" >${i}</th>
      <td>${db[i].id}</td>
      <td>${db[i].first_Name}</td>
      <td>${db[i].last_Name}</td>
      <td>${db[i].deposit}</td>
      <td>${db[i].card}</td>
      <td><button class="btn btn-info btnDelete" data-btnDelete = ${i}>Delete</button></td>
      <td> <button id=${i} class="btn btn-danger btnEdit" view='edit-view' data-btnEdit = ${i}>Edit</button></td>
      `;
  }
  accounts.innerHTML = text;
  let btnsDelete = document.querySelectorAll(".btnDelete");
  let btnsEdit = document.querySelectorAll(".btnEdit");
  for (let i = 0; i < btnsDelete.length; i++) {
    btnsDelete[i].addEventListener("click", deleteAccount);
    btnsEdit[i].addEventListener("click", editAccount);
  }
}
function deleteAccount() {
  let index = this.getAttribute("data-btnDelete");
  db.splice(index, 1);
  editDeleteAccount();
}

let efirstName = document.querySelector("[name = efirst_name]");
let elastName = document.querySelector("[name = elast_name]");
let edeposit = document.querySelector("[name = edeposit]");
let ecard = document.querySelector("[name = ecard]");
let index = null;

function editAccount() {
  //hide all views
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }
  //select and display edit view
  let editSection = document.querySelector(".edit-section");
  let eSubmit = document.querySelector(".eSubmit");
  console.log(eSubmit);
  editSection.style.display = "block";

  // find index and complete to edit form
  index = this.id;

  efirstName.value = db[index].first_Name;
  elastName.value = db[index].last_Name;
  edeposit.value = db[index].deposit;
  ecard.value = db[index].card;

  eSubmit.addEventListener("click", updateAccount);
}

function updateAccount() {
  db[index] = {
    id: db[index].id,
    first_Name: efirstName.value,
    last_Name: elastName.value,
    deposit: edeposit.value,
    card: ecard.value,
  };
  resetInputs();
}
