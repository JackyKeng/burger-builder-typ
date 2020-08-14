import React, { useState } from "react";
import BurgerBuilder from "./BurgerBuilder";
import BuildControls from "./BuildControls";
import Modal from "../common/Modal/Modal";
import OrderSummary from "./OrderSummary";

interface IBurgerProps {
    config?: IBurgerConfig;
    onSubmit: (
        data: IBurgerOrder,
        onSubmitResult: (
            result: boolean,
            onSubmitResultReturn: (message: string) => void
        ) => void
        // onSubmitResultReturn: (message: string) => void
    ) => void;
}

const INGREDIENTS_PRICE: IIngredients = {
    salad: 0.5,
    bacon: 1.5,
    cheese: 1,
    meat: 2.5,
};

const INGREDIENTS_MAX: IIngredients = {
    salad: 3,
    bacon: 2,
    cheese: 2,
    meat: 3,
};

const INGREDIENTS_DEFAULT: IIngredients = {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
};

const BurgerIngredients: React.FC<IBurgerProps> = ({
    config = {
        ingredientPrice: INGREDIENTS_PRICE,
        ingredientMaxCount: INGREDIENTS_MAX,
        initPrice: 4,
    },
    onSubmit,
}: IBurgerProps) => {
    const { ingredientPrice, ingredientMaxCount, initPrice } = config;

    const [price, setPrice] = useState(initPrice || 4);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [ingredients, setIngredients] = useState(INGREDIENTS_DEFAULT);

    const onClickMoreHandler = (type: string) => {
        setIngredients({ ...ingredients, [type]: ingredients[type] + 1 });
        setPrice(
            price! +
                (ingredientPrice
                    ? ingredientPrice![type]
                    : INGREDIENTS_PRICE[type])
        );
    };

    const onClickLessHandler = (type: string) => {
        setIngredients({ ...ingredients, [type]: ingredients[type] - 1 });
        setPrice(
            price! -
                (ingredientPrice
                    ? ingredientPrice![type]
                    : INGREDIENTS_PRICE[type])
        );
    };

    const continueHandler = (data: IBurgerOrder) => {
        onSubmit(data, (result, onSubmitResultReturn) =>
            resultHandler(result, onSubmitResultReturn)
        );
        setShowSummaryModal(false);
    };

    const resultHandler = (result: boolean, onSubmitResultReturn) => {
        if (result) {
            setPrice(initPrice || 4);
            setIngredients(INGREDIENTS_DEFAULT);
            onSubmitResultReturn("Order Success!");
        } else onSubmitResultReturn("Order Failed! Please try again!");
    };

    // Check ingredients see whether it is purchasable
    let sum = 0;
    for (let key in ingredients) {
        sum += ingredients[key];
    }
    const purchasable = sum > 0;

    return (
        <div data-testid="burger-container">
            <BurgerBuilder ingredients={ingredients} />
            <BuildControls
                ingredients={ingredients}
                ingredientsMax={ingredientMaxCount! || INGREDIENTS_MAX}
                price={price!}
                onClickMore={onClickMoreHandler}
                onClickLess={onClickLessHandler}
                onClickOrder={() => setShowSummaryModal(true)}
                purchasable={purchasable}
            />
            <Modal
                show={showSummaryModal}
                onClose={() => setShowSummaryModal(false)}
                useBackDrop={true}
            >
                <OrderSummary
                    ingredients={ingredients}
                    price={price!}
                    onCancel={() => setShowSummaryModal(false)}
                    onContinue={continueHandler}
                />
            </Modal>
        </div>
    );
};

export default BurgerIngredients;
