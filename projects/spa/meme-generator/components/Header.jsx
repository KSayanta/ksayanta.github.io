import icon from "/troll-face.png";

export default function Header() {
  return (
    <header className="main-header">
      <img src={icon} alt="" />
      <h1 className="heading">Meme Generator</h1>
    </header>
  );
}
