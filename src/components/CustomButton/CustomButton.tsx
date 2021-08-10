import './custom-button.scss';

interface IButtonProperty extends React.HTMLAttributes<Element> {
  children: React.ReactNode;
  additionalClassName?: string;
}

const CustomButton = ({
  children,
  additionalClassName,
  ...otherProps
}: IButtonProperty) => {
  return (
    <button
      {...otherProps}
      type='button'
      className={`usa-button usa-button--base ${additionalClassName}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;

CustomButton.defaultProps = {
  additionalClassName: '',
};
