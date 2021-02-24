import Food from '../../models/v1/Food.js';
import FoodList from '../../models/v2/FoodList.js';

const foodList = new FoodList();

const handleAddFood = () => {
  const newfood = getDataFromForm();
  foodList._addFood(newfood);
  renderFoodList();
  saveLocalStorage();
  closeFoodModal();
};

const handleDeleteFood = (id) => {
  foodList._deleteFood(id);
  renderFoodList();
  saveLocalStorage();
  closeFoodDeleteModal();
};

const handleFilterFood = (e) => {
  let filterFoodList = [];
  if (e.target.value === 'all') {
    filterFoodList = foodList.arr;
  } else {
    filterFoodList = foodList.arr.filter(
      (food) => food.type === e.target.value
    );
  }

  renderFoodList(filterFoodList);
};

const closeFoodModal = () => {
  document.getElementById('foodModalCloseBtn').click();
};

const closeFoodDeleteModal = () => {
  document.getElementById('foodDeleteModalCloseBtn').click();
};

const resetFoodForm = () => {
  document.getElementById('foodForm').reset();
};

const handleUpdateFood = () => {
  const food = getDataFromForm();
  foodList._updateFood(food);
  renderFoodList();
  closeFoodModal();
  saveLocalStorage();
  resetFoodForm();
};

const btnOpenFormToUpdateFood = (id) => {
  document.getElementById('btnUpdateFood').style.display = 'block';
  document.getElementById('btnAddFood').style.display = 'none';
  document.getElementById('modalTitleAddAndUpdate').innerHTML =
    'Cập nhật Món Ăn';
  bindingDataToFrom(foodList._getFood(id));
};

const btnOpenFormToAddFood = () => {
  resetFoodForm();
  document.getElementById('btnUpdateFood').style.display = 'none';
  document.getElementById('btnAddFood').style.display = 'block';
  document.querySelector('.modal-title').innerHTML = 'Thêm Món Ăn';
};

window.handleUpdateFood = handleUpdateFood;

window.handleDeleteFood = handleDeleteFood;

window.btnOpenFormToUpdateFood = btnOpenFormToUpdateFood;

const renderFoodList = (foods = foodList.arr) => {
  const tbodyFood = document.getElementById('tbodyFood');

  let foodListHTML = '';

  foods.forEach((food) => {
    foodListHTML += `
    <tr>
       <td>${food.id}</td>
       <td>${food.name}</td>
       <td>${food.type === 'vegetarian' ? 'Chay' : 'Mặn'}</td>
       <td>${food.originalPrice}</td>
       <td>${food.promotion} %</td>
       <td>${food.priceAfterPromotion}</td>
        <td>${food.status === 'available' ? 'Còn' : 'Hết'}</td>
       <td>
        <button onclick="renderDeleteFood('${
          food.id
        }')" data-toggle="modal" data-target="#modalConfirmDeleteFood" class="btn btn-danger">Xóa</button>

        <button onclick="btnOpenFormToUpdateFood('${
          food.id
        }')"  data-toggle="modal"
        data-target="#exampleModal" class="btn btn-info">Cập nhật</button>

        </td>
     </tr>
    `;
  });

  tbodyFood.innerHTML = foodListHTML;
};

const renderDeleteFood = (id) => {
  const modalDeleteFoodTable = document.getElementById('modalDeleteFoodTable');
  const food = foodList.arr.find((food) => food.id === id);

  if (!food) return;
  const deletedFoodHTML = `
        <tr>
            <th>Hình ảnh</th>
            <td><img src="../../assets/img/${food.photo}" alt="${
    food.name
  }" /></td>
        </tr>
         <tr>
            <th>Tên</th>
            <td>${food.name}</td>
        </tr>
        <tr>
            <th>Loại</th>
            <td>${food.type === 'vegetarian' ? 'Chay' : 'Mặn'}</td>
        </tr>
         <tr>
            <th>Giá</th>
            <td>${food.originalPrice}</td>
        </tr>
         <tr>
            <th>Khuyến mãi</th>
            <td>${food.promotion}</td>
        </tr>
         <tr>
            <th>Giá KM</th>
            <td>${food.priceAfterPromotion}</td>
        </tr>
         <tr>
            <th>Tình trạng</th>
            <td>${food.status === 'available' ? 'Còn' : 'Hết'}</td>
        </tr>
    
  `;
  modalDeleteFoodTable.innerHTML = deletedFoodHTML;

  document
    .getElementById('btnDeleteFood')
    .addEventListener('click', () => handleDeleteFood(id));
};

window.renderDeleteFood = renderDeleteFood;

const saveLocalStorage = () => {
  localStorage.setItem('foodList', JSON.stringify(foodList.arr));
};

const getLocalStorage = () => {
  foodList.arr = JSON.parse(localStorage.getItem('foodList') || []);

  renderFoodList();
};

const getDataFromForm = () => {
  const id = document.getElementById('foodID').value;
  const name = document.getElementById('tenMon').value;
  const type = document.getElementById('loai').value;
  const price = document.getElementById('giaMon').value;
  const promotion = document.getElementById('khuyenMai').value;
  const status = document.getElementById('tinhTrang').value;

  let photo = '';
  if (document.getElementById('hinhMon').files.length > 0) {
    photo = document.getElementById('hinhMon').files[0].name;
  }

  const desc = document.getElementById('moTa').value;

  const newFood = new Food(
    id,
    name,
    type,
    price,
    promotion,
    status,
    photo,
    desc
  );

  newFood.calcPromotion();

  return newFood;
};

const bindingDataToFrom = (food) => {
  document.getElementById('foodID').disabled = 'true';
  document.getElementById('foodID').value = food.id;
  document.getElementById('tenMon').value = food.name;
  document.getElementById('loai').value = food.type;
  document.getElementById('giaMon').value = food.originalPrice;
  document.getElementById('khuyenMai').value = food.promotion;
  document.getElementById('tinhTrang').value = food.status;
  //   document.getElementById('hinhMon').files[0].name;
  document.getElementById('moTa').value = food.desc;
};

document.getElementById('btnAddFood').addEventListener('click', handleAddFood);

document
  .getElementById('btnUpdateFood')
  .addEventListener('click', handleUpdateFood);

document
  .getElementById('btnOpenFormToAddFood')
  .addEventListener('click', btnOpenFormToAddFood);

document.getElementById('selLoai').addEventListener('change', handleFilterFood);

//-------call function below this line----------------

getLocalStorage();
