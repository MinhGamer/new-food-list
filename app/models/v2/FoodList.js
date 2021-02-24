class FoodList {
  constructor() {
    this.arr = [];
  }

  _addFood(food) {
    this.arr.push(food);
  }

  _deleteFood(id) {
    const indexFood = this.arr.findIndex((food) => food.id === id);

    if (indexFood === -1) return;

    this.arr.splice(indexFood, 1);
  }
}

export default FoodList;
