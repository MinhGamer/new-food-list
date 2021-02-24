import Food from '../../models/v1/Food.js';
import FoodList from '../../models/v2/FoodList.js';

const foodList = new FoodList();

const addFood = () => {
  const newfood = getDataFromForm();
  foodList._addFood(newfood);
  renderFoodListTable();
  saveLocalStorage();
};

const renderFoodListTable = () => {
  const tbodyFood = document.getElementById('tbodyFood');

  let foodListHTML = '';

  foodList.arr.forEach((food) => {
    foodListHTML += `
    <tr>
       <td>${food.id}</td>
       <td>${food.name}</td>
       <td>${food.type === 'vegeterian' ? 'Chay' : 'Mặn'}</td>
       <td>${food.originalPrice}</td>
       <td>${food.promotion} %</td>
       <td>${food.priceAfterPromotion}</td>
        <td>${food.status === 'available' ? 'Còn' : 'Hết'}</td>
     </tr>
    `;
  });

  tbodyFood.innerHTML = foodListHTML;
};

const updateFood = () => {
  console.log('update food');
};

const saveLocalStorage = () => {
  localStorage.setItem('foodList', JSON.stringify(foodList.arr));
};

const getLocalStorage = () => {
  foodList.arr = JSON.parse(localStorage.getItem('foodList') || []);

  renderFoodListTable();
};

const getDataFromForm = () => {
  const id = document.getElementById('foodID').value;
  const name = document.getElementById('tenMon').value;
  const type = document.getElementById('loai').value;
  const price = document.getElementById('giaMon').value;
  const promotion = document.getElementById('khuyenMai').value;
  const status = document.getElementById('tinhTrang').value;
  const photo = document.getElementById('hinhMon').files[0].name;
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

document.getElementById('btnAddFood').addEventListener('click', addFood);

document.getElementById('btnUpdateFood').addEventListener('click', updateFood);

//-------call function below this line----------------

getLocalStorage();
