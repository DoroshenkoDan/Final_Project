import React from "react";
import "./Modal.scss"
import PropTypes from "prop-types";

export default function Modal({
  header,
  closeButton,
  closeMod,
  text,
  actionBtn,
  cancelBtn,
  removeOrder
}) {
  return (
    <div className="modal-container" onClick={closeMod}>
      <div className="modal" id="modal">
        <h3 className="modalHeader">
          {header}
          {closeButton && (
            <span
              className="closeBtn"
              onClick={closeMod}
              role="closeBtn"
            ></span>
          )}
        </h3>
        <div className="modalContent" role="text">
          {text}
        </div>
        <div className="actionsBtn">
          <button className="confirmBtn" onClick={removeOrder}>
            {actionBtn}
          </button>
          <button className="cancelBtn" onClick={closeMod}>
            {cancelBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string,
  closeButton: PropTypes.func,
  closeMod: PropTypes.func,
  actionBtn: PropTypes.string,
  cancelBtn: PropTypes.string,
  removeOrder: PropTypes.func
};


