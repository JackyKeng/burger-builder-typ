import * as React from "react";
import {
    BuildControlsDiv,
    BuildControlDiv,
    Label,
    LessButton,
    MoreButton,
    OrderButton,
} from "../Style/burger.controls.styled.component";

const controlsLabel = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
];

export interface BuildControlsProps {
    ingredients: IIngredients;
    ingredientsMax: IIngredients;
    price: number;
    onClickMore: (type: string) => void;
    onClickLess: (type: string) => void;
    onClickOrder: (ingredient: IBurgerOrder) => void;
    purchasable: boolean;
}

const BuildControls: React.FC<BuildControlsProps> = ({
    ingredients,
    ingredientsMax,
    price,
    onClickMore,
    onClickLess,
    onClickOrder,
    purchasable,
}: BuildControlsProps) => {
    const onClickOrderHandler = () => {
        const details = {
            ingredients: ingredients,
            price: price,
        };

        return onClickOrder(details);
    };

    return (
        <BuildControlsDiv>
            <p>
                Current Price: <strong>{price.toFixed(2)}</strong>
            </p>
            {controlsLabel.map((element, i) => {
                return (
                    <BuildControlDiv key={i}>
                        <Label>{element.label}</Label>
                        <LessButton
                            onClick={() => onClickLess(element.type)}
                            disabled={ingredients[element.type] <= 0}
                            data-testid={`less-button-${element.type}`}
                        >
                            Less
                        </LessButton>
                        <MoreButton
                            onClick={() => onClickMore(element.type)}
                            disabled={
                                ingredients[element.type] >=
                                ingredientsMax[element.type]
                            }
                            data-testid={`more-button-${element.type}`}
                        >
                            More
                        </MoreButton>
                    </BuildControlDiv>
                );
            })}

            <OrderButton disabled={!purchasable} onClick={onClickOrderHandler}>
                ORDER NOW
            </OrderButton>
        </BuildControlsDiv>
    );
};

export default BuildControls;
