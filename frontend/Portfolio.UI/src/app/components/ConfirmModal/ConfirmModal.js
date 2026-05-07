import { createPortal } from "react-dom";
import { forwardRef, useEffect, useState } from "react";
import Button from "../Button/Button";
import classes from "./ConfirmModal.module.css";
import { Trash2 } from "lucide-react";
import { motion, scale } from "framer-motion";

const ConfirmModal = forwardRef(
  ({ isOpen, onConfirm, onCancel, text, title }, ref) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (isOpen && ref.current) {
        if (!ref.current.open) {
          ref.current?.showModal();
        }
      }
    }, [isOpen, ref]);

    if (!mounted || !isOpen) return null;

    return createPortal(
      <motion.dialog
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={classes.dialog}
        ref={ref}
      >
        <div className={classes.modalContainer}>
          <div className={classes.trashContainer}>
            <Trash2 size={35} color="#ef4444" />
          </div>
          <h2>{title}</h2>
          <p>{text}</p>
          <div className={classes.buttonsContainer}>
            <Button
              className={classes.cancelButton}
              whileTap={{ scale: 0.95 }}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className={classes.confirmButton}
              onClick={onConfirm}
              whileTap={{ scale: 0.95 }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </motion.dialog>,
      document.body,
    );
  },
);

export default ConfirmModal;
