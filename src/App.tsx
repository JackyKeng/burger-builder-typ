import React from "react";
import "./App.css";
import BurgerContainer from "./components/Burger/BurgerContainer";

const INGREDIENTS_PRICE: IIngredients = {
    salad: 5,
    bacon: 12,
    cheese: 7,
    meat: 15,
};

const INGREDIENTS_MAX: IIngredients = {
    salad: 5,
    bacon: 5,
    cheese: 5,
    meat: 5,
};

const onSubmitHandler = (data, callback) => {
    console.log(data);
    callback(true, (message) => {
        alert(message);
    });
};

function App() {
    return (
        <BurgerContainer
            config={{
                // ingredientPrice: INGREDIENTS_PRICE,
                ingredientMaxCount: INGREDIENTS_MAX,
                // initPrice: 10,
            }}
            onSubmit={onSubmitHandler}
        ></BurgerContainer>
    );
}

export default App;
