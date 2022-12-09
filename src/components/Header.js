import logo from "../images/bomb.svg";

const Header = () => {
  return (
    <header>
      <h2>Minesweeper</h2>
      <img src={logo} className="logo" alt="logo" />
    </header>
  );
};

export default Header;
