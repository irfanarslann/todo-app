const Button = ({ style, buttonText }) => {
  return (
    <button className="button" style={style}>
      {buttonText}
    </button>
  );
};

export default Button;
