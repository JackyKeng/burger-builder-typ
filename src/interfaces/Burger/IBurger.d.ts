interface IIngredients {
    salad: number;
    cheese: number;
    bacon: number;
    meat: number;
}

interface IBurgerOrder {
    ingredients: IIngredients;
    price: number;
}

interface IBurgerConfig {
    ingredientPrice?: IIngredients;
    ingredientMaxCount?: IIngredients;
    initPrice?: number;
}
