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
      <img
        className='landing-page-image'
        src='../images/landing-page.png'
        alt='Conservation Practice Data and Innovations Background'
      />
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
