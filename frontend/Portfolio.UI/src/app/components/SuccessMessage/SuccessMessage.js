import { motion } from "framer-motion";
import classes from "./SuccessMessage.module.css";
import { CheckCircle } from "lucide-react";
import Button from "../Button/Button";
import { iconVariants, successMessageVariants } from "@/lib/variants";

export default function SuccessMessage({
  onClick,
  title,
  text,
  buttonText,
  className,
}) {
  return (
    <motion.div
      variants={successMessageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`${classes.successContainer} ${className ? className : ""}`}
    >
      <motion.div variants={iconVariants} className={classes.iconWrapper}>
        <CheckCircle size={100} color="#4ade80" strokeWidth={1.5} />
      </motion.div>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.text}>{text}</p>

      <div className={classes.buttonWrapper}>
        <Button onClick={onClick} whileTap={{ scale: 0.95 }}>
          {buttonText}
        </Button>
      </div>
    </motion.div>
  );
}
