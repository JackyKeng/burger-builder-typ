import React from "react";
import styled from "styled-components";

const ModalDiv = styled.div`
    position: fixed;
    z-index: 500;
    background-color: white;
    width: 70%;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    padding: 16px;
    left: 15%;
    top: 30%;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    transform: ${({ show }) => {
        return show ? "translateY(0)" : "translateY(-100vh)";
    }};
    opacity: ${({ show }) => {
        return show ? "1" : "0";
    }};
    @media (min-width: 600px) {
        width: 500px;
        left: calc(50% - 250px);
    }
`;

const BackdropDiv = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 499;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

export interface ModalProps {
    show: boolean;
    children: React.ReactNode;
    useBackDrop?: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
    show,
    children,
    onClose,
    useBackDrop = false,
}: ModalProps) => {
    return (
        <div>
            {show && useBackDrop && <BackdropDiv onClick={onClose} />}
            <ModalDiv show={show}>{children}</ModalDiv>
        </div>
    );
};

export default Modal;
