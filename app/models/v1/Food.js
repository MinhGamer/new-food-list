class Food {
  constructor(
    _id,
    _name,
    _type,
    _originalPrice,
    _promotion,
    _status,
    _photo,
    _desc
  ) {
    this.id = _id;
    this.name = _name;
    this.type = _type;
    this.originalPrice = _originalPrice;
    this.promotion = _promotion;
    this.status = _status;
    this.photo = _photo;
    this.desc = _desc;
    this.priceAfterPromotion = 0;
  }

  calcPromotion() {
    this.priceAfterPromotion =
      (+this.originalPrice * (100 - +this.promotion)) / 100;
  }
}

export default Food;
