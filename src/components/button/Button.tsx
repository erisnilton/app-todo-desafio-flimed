import "./style.scss";
import classNames from "classnames";

export interface ButtonProps {
  children?: React.ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
  rounded?: boolean;
  flat?: boolean;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  onClick?: React.DOMAttributes<HTMLButtonElement>["onClick"];
}

const Button = (props: ButtonProps) => {
  const { color, size, children, rounded, flat, onClick } = props;
  return (
    <button
      className={classNames([
        "btn",
        `btn--color-${color}`,
        `btn--size-() => ${size}`,
        {
          "btn--rounded": rounded,
          "btn--flat": flat,
        },
      ])}
      onClick={onClick}
      type={props.type}
    >
      {" "}
      {children && children}
    </button>
  );
};

export default Button;
