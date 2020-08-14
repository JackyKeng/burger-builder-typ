import * as React from "react";
import Button from "../common/Button/Button";

export interface OrderSummaryProps {
    ingredients: IIngredients;
    price: number;
    onCancel: () => void;
    onContinue: (data: IBurgerOrder) => void;
}
const OrderSummary: React.FC<OrderSummaryProps> = ({
    ingredients,
    price,
    onCancel,
    onContinue,
}: OrderSummaryProps) => {
    const ingredientSummary = Object.keys(ingredients).map((key, i) => {
        return (
            <li key={i} style={{ textTransform: "capitalize" }}>
                {key}: {ingredients[key]}
            </li>
        );
    });

    const onSubmit = () => {
        const data = {
            ingredients: ingredients,
            price: price,
        };
        onContinue(data);
    };

    return (
        <div>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>{ingredientSummary}</ul>
            <p>
                <strong>Total Price: {price.toFixed(2)}</strong>
            </p>
            <p>Continue to Checkout?</p>
            <Button type="Danger" onClick={onCancel} value="CANCEL" />
            <Button type="Success" onClick={onSubmit} value="CONTINUE" />
        </div>
    );
};

export default OrderSummary;
