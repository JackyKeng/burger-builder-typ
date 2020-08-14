import * as React from "react";
import {
    BurgerBuilderContainer,
    BreadBottom,
    BreadTop,
    Seeds1,
    Seeds2,
    Meat,
    Cheese,
    Salad,
    Bacon,
} from "../Style/burger.builder.styled.component";

export interface BurgerProps {
    ingredients: IIngredients;
}

const Burger: React.FC<BurgerProps> = ({ ingredients }: BurgerProps) => {
    const loadIngredients = Object.keys(ingredients)
        .map((element) => {
            const count = ingredients[element];

            return [...Array(count)].map((_, i) => {
                switch (element) {
                    case "salad":
                        return (
                            <Salad
                                data-testid="ingredient-salad"
                                key={`salad-${i}`}
                            />
                        );
                    case "cheese":
                        return (
                            <Cheese
                                data-testid="ingredient-cheese"
                                key={`cheese-${i}`}
                            />
                        );
                    case "bacon":
                        return (
                            <Bacon
                                data-testid="ingredient-bacon"
                                key={`bacon-${i}`}
                            />
                        );
                    case "meat":
                        return (
                            <Meat
                                data-testid="ingredient-meat"
                                key={`meat-${i}`}
                            />
                        );
                }
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    return (
        <BurgerBuilderContainer>
            <BreadTop>
                <Seeds1 />
                <Seeds2 />
            </BreadTop>
            {loadIngredients.length === 0
                ? "Please start adding ingredients!"
                : loadIngredients}
            <BreadBottom />
        </BurgerBuilderContainer>
    );
};

export default Burger;
