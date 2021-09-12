interface IHeaderProps {
  priority: string;
  headerText: string;
  paragraphText?: string;
  parentClassNames?: string;
  headerClassNames?: string;
}

const Header = ({
  priority,
  headerText,
  parentClassNames,
  headerClassNames,
  paragraphText,
}: IHeaderProps) => {
  const DynmaicHeader: any = `h${priority}`;
  return (
    <div className={parentClassNames}>
      <DynmaicHeader className={headerClassNames}>{headerText}</DynmaicHeader>
      <p>{paragraphText}</p>
    </div>
  );
};

export default Header;

Header.defaultProps = {
  paragraphText: '',
  parentClassNames: '',
  headerClassNames: '',
};
