// &----HTML ELEMENTS ----
const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("imageInput");
const addBtn = document.getElementById("addBtn");
const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const updateBtn = document.getElementById("updateBtn");
// &----GLOBAL VARIABLES ----
let productList;
let validateInputName = /^[A-Za-z\s]{2,30}$/;
let categoryRejex = /^[A-Za-z0-9\s]+$/;
let priceRejex = /^[1-9]\d{0,4}(\.\d{1,2})?$/;
let descriptionRejex = /^[A-Za-z0-9\s.,!&()-]+$/;
let updatedIndex;
if (localStorage.getItem("productList") === null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayAllProducts();
}
// &----FUNCTIONS ----
function addProduct() {
  if (
    validate(validateInputName, nameInput) &&
    validate(categoryRejex, categoryInput) &&
    validate(priceRejex, priceInput) &&
    validate(descriptionRejex, descriptionInput)
  ) {
    let product = {
      name: nameInput.value,
      category: categoryInput.value,
      price: priceInput.value,
      description: descriptionInput.value,
      image: imageInput.files[0] ? imageInput.files[0].name : "",
    };

    productList.push(product);
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProduct(productList.length - 1);
    console.log(productList);
    clearInputs();
  }
}
function displayProduct(i) {
  let productHTML = `
   <div class="p-1 item">
                     <div class=" rounded border border-1 p-3 border-mainn">
                        <img src="./imgs/${productList[i].image}" alt="${productList[i].name}" class="w-100">
                        <h4 class="mt-4">${productList[i].name}</h4>
                       <div class="d-flex justify-content-between align-items-center">
                         <h5>${productList[i].category}</h5>
                        <h6 class="text-success fw-bold"><span class="me-1 text-white">${productList[i].price}</span> $</h6>
                       </div>
                        <p >${productList[i].description}</p>
                        <button class="btn btn-outline-warning me-2" onclick="updateProduct(${i})">Update</button>
                 <button class="btn btn-outline-danger" id="deleteBtn" onclick="deleteProduct(${i})">Delete</button>
                    </div>
                   </div>
                   
`;

  productsContainer.innerHTML += productHTML;
}
function displayAllProducts() {
  for (let i = 0; i < productList.length; i++) {
    displayProduct(i);
  }
}

function clearInputs() {
  nameInput.value = "";
  nameInput.classList.remove("is-valid");
  categoryInput.value = "";
  categoryInput.classList.remove("is-valid");
  priceInput.value = "";
  priceInput.classList.remove("is-valid");
  descriptionInput.value = "";
  descriptionInput.classList.remove("is-valid");
  imageInput.value = null;
}
function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  productsContainer.innerHTML = "";
  displayAllProducts();
}
function searchProduct() {
  productsContainer.innerHTML = "";
  for (let i = 0; i < productList.length; i++) {
    if (
      productList[i].name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      displayProduct(i);
    }
  }
}

function validate(rejexPattern, elementName) {
  if (rejexPattern.test(elementName.value)) {
    elementName.classList.add("is-valid");
    elementName.classList.remove("is-invalid");
    elementName.nextElementSibling.nextElementSibling.classList.add("d-none");
    return true;
  }
  elementName.classList.add("is-invalid");
  elementName.classList.remove("is-valid");
  elementName.nextElementSibling.nextElementSibling.classList.remove("d-none");
  return false;
}
function updateProduct(i) {
  updatedIndex = i;
  console.log("update", i);
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  nameInput.value = productList[i].name;
  categoryInput.value = productList[i].category;
  priceInput.value = productList[i].price;
  descriptionInput.value = productList[i].description;
  // imageInput.value = productList[i].image;
}
// &----EVENTS ----
addBtn.addEventListener("click", function () {
  addProduct();
});

searchInput.addEventListener("input", () => {
  searchProduct();
});
nameInput.addEventListener("input", function () {
  validate(validateInputName, nameInput);
});
categoryInput.addEventListener("input", function () {
  validate(categoryRejex, categoryInput);
});
priceInput.addEventListener("input", function () {
  validate(priceRejex, priceInput);
});
descriptionInput.addEventListener("input", function () {
  validate(descriptionRejex, descriptionInput);
});
updateBtn.addEventListener("click", function () {
  if (
    validate(validateInputName, nameInput) &&
    validate(categoryRejex, categoryInput) &&
    validate(priceRejex, priceInput) &&
    validate(descriptionRejex, descriptionInput)
  ) {
    productList[updatedIndex].name = nameInput.value;
    productList[updatedIndex].category = categoryInput.value;
    productList[updatedIndex].price = priceInput.value;
    productList[updatedIndex].description = descriptionInput.value;
    localStorage.setItem("productList", JSON.stringify(productList));
    productsContainer.innerHTML = "";
    displayAllProducts();
    clearInputs();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
  }
});
