import React from "react";
import styled from "styled-components";

const ButtonDiv = styled.button`
    background-color: transparent;
    border: none;
    color: white;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;
    color: ${({ type }) => {
        if (type === "Success") return "#5c9210";

        if (type === "Danger") return "#944317";
    }};

    &:first-of-type {
        margin-left: 0;
        padding-left: 0;
    }
`;

export interface ButtonProps {
    value: string;
    type: "Success" | "Danger";
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
    value,
    type,
    onClick,
}: ButtonProps) => {
    return (
        <ButtonDiv type={type} onClick={onClick}>
            {value}
        </ButtonDiv>
    );
};

export default Button;
