import React from "react";

import badSmiley from "../../../../../asset/badSmiley.svg";
import "./model.scss";
interface ToastFormEmployeeBadProps {
  validationResult: string;
}

export const ToastFormEmployeeBad: React.FC<ToastFormEmployeeBadProps> = ({
  validationResult,
}) => {
  return (
    <div className="toastFormEmployee">
      <div className="toastFormEmployee_textBad">
        <h3>Uncreated employee</h3>
        <p>{validationResult}</p>
      </div>
      <img className="toastFormEmployee_img" src={badSmiley} alt="badSmiley" />
    </div>
  );
};
