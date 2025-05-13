import icon from "/rolling-dices.webp";

export default function Header() {
  return (
    <header className="main-header">
      <img src={icon} alt="" />
      <h1 className="heading">Tenzies</h1>
    </header>
  );
}
