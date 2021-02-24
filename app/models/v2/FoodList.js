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

  _getFood(id) {
    const food = this.arr.find((food) => food.id === id);

    if (!food) return;

    return food;
  }

  _updateFood(food) {
    const foodIndex = this.arr.findIndex((_food) => _food.id === _food.id);

    if (foodIndex === -1) return;

    this.arr[foodIndex] = food;
  }
}

export default FoodList;
