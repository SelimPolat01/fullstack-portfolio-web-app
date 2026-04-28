import Image from "next/image";
import classes from "./Error.module.css";

export default function Error() {
  return (
    <div className={classes.errorDiv}>
      <Image
        src="/error.svg"
        alt="error"
        width={800}
        height={400}
        sizes="800px"
      />
    </div>
  );
}
