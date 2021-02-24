import Food from '../../models/v1/Food.js';
import FoodList from '../../models/v2/FoodList.js';

const foodList = new FoodList();

const addFood = () => {
  const newfood = getDataFromForm();
  foodList._addFood(newfood);
  console.log(foodList.arr);
};

const updateFood = () => {
  console.log('update food');
};

document.getElementById('btnAddFood').addEventListener('click', addFood);

document.getElementById('btnUpdateFood').addEventListener('click', updateFood);

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
