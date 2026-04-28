import classes from "./Frame.module.css";

export default function Frame({
  icon,
  total,
  change,
  text,
  changeIcon,
  upChange,
  downChange,
  className,
}) {
  return (
    <div className={`${classes.div} ${className ? className : ""}`}>
      <div className={classes.divContainer}>
        <div className={classes.iconContainer}>{icon}</div>
        <div className={classes.textContainer}>
          <p className={classes.text}>{text}</p>
        </div>
        <div className={classes.totalChangeContainer}>
          <div className={classes.totalContainer}>
            <h1 className={classes.total}>{total}</h1>
          </div>
          <div
            className={`${classes.changeContainer} ${upChange ? classes.greenBg : downChange ? classes.redBg : ""}`}
          >
            <span
              className={`${classes.changeIcon} ${upChange ? classes.upColor : downChange ? classes.downColor : ""}`}
            >
              {changeIcon}
            </span>
            <p
              className={
                upChange
                  ? classes.upChange
                  : downChange
                    ? classes.downChange
                    : ""
              }
            >
              {change}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
