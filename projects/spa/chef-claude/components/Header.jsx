import logo from "/claude.png";

export default function Header() {
  return (
    <header className="main-header">
      <img src={logo} alt="chef logo" />
      <h1 className="heading">Chef Claude</h1>
    </header>
  );
}
