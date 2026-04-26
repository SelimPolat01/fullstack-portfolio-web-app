import Image from "next/image";
import classes from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }) {
  return (
    <div className={classes.errorDiv}>
      <Image src="/warning.svg" alt="warning" width={40} height={40} priority />
      <div>
        <h2>{message}</h2>
        <p>Check and try again.</p>
      </div>
    </div>
  );
}
