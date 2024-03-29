import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="logo with text 'Around the U.S.'"
        className="header__logo"
      />
    </header>
  );
}

export default Header;
