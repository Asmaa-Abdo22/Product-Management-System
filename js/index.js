// &----HTML ELEMENTS ----
const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("imageInput");
const addBtn = document.getElementById("addBtn");
const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
// &----GLOBAL VARIABLES ----
let productList;
if (localStorage.getItem("productList") === null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayAllProducts();
}
// &----FUNCTIONS ----
function addProduct() {
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
                        <button class="btn btn-outline-warning me-2">Update</button>
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
  categoryInput.value = "";
  priceInput.value = "";
  descriptionInput.value = "";
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
// &----EVENTS ----
addBtn.addEventListener("click", function () {
  addProduct();
});

searchInput.addEventListener("input", () => {
  searchProduct();
});
