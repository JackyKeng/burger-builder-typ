import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
import BurgerContainer from "../components/Burger/BurgerContainer";

const mockIngredientsMaxCount = {
    salad: 3,
    bacon: 3,
    cheese: 3,
    meat: 3,
};

const mockIngredientsPrice = {
    salad: 5,
    bacon: 12,
    cheese: 7,
    meat: 15,
};

const mockSubmit = jest.fn();
const renderSubject = (props = {}) => {
    const defaultProps = {
        config: {
            ingredientPrice: mockIngredientsPrice,
            ingredientMaxCount: mockIngredientsMaxCount,
        },
        onSubmit: mockSubmit,
    };

    const renderResult = render(
        <BurgerContainer {...defaultProps} {...props} />
    );

    return { ...renderResult };
};

test("render burger container", () => {
    const { getByTestId } = renderSubject({});
    expect(getByTestId("burger-container")).toBeInTheDocument;
});

test("append burger ingredient", () => {
    const {
        getByText,
        queryAllByTestId,
        getByTestId,
        queryByText,
    } = renderSubject({});
    expect(getByText("Please start adding ingredients!")).toBeInTheDocument;
    expect(queryAllByTestId("ingredient-meat").length).toBe(0);
    fireEvent.click(getByTestId("more-button-meat"));
    fireEvent.click(getByTestId("more-button-meat"));
    expect(queryAllByTestId("ingredient-meat").length).toBe(2);
    expect(queryByText("Please start adding ingredients!")).not
        .toBeInTheDocument;
});
