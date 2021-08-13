import './custom-button.scss';

interface IButtonProperty extends React.HTMLAttributes<Element> {
  children: React.ReactNode;
  additionalClassName?: string;
  ariaLabel?: string;
}

const CustomButton = ({
  ariaLabel,
  additionalClassName,
  children,
  ...otherProps
}: IButtonProperty) => {
  return (
    <button
      {...otherProps}
      aria-label={ariaLabel}
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
  ariaLabel: '',
};
