import React from "react";

import smiley from "../../../../../asset/smiley.svg";

import "./model.scss";

interface ToastFormEmployeeGoodProps {
  firstname: string;
}

export const ToastFormEmployeeGood: React.FC<ToastFormEmployeeGoodProps> = ({
  firstname,
}) => {
  return (
    <div className="toastFormEmployee">
      <h3 className="toastFormEmployee_textGood">
        Employee {firstname} created
      </h3>
      <img className="toastFormEmployee_img" src={smiley} alt="smile" />
    </div>
  );
};
