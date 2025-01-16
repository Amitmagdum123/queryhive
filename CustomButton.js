import React from "react";
import { Button } from "react-bootstrap";
import { colors } from "./style/Colors";


const CustomButton = ({ children, type = "button", onClick, disabled = false }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="custom-button w-50 rounded-pill"
      style={{
        background: colors.primaryGradient,
        border: "none",
        borderRadius: "50px",
        color: "#fff",
        padding: "10px 20px",
        fontWeight: "bold",
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
