import './Main.css'

export default function Main() {
  return (
    <main className="wrapper">
      <section className="form ">
        <label htmlFor='topText'>Top Text </label>
        <input
          type="text"
          placeholder="One does not simply"
          id="topText"
          name="topText"
        />

        <label htmlFor='bottomText'>Bottom Text</label>
        <input
          type="text"
          placeholder="Walk into Mordor"
          id="bottomText"
          name="bottomText"
        />

        <button className='btn btn-cta'>Get a new meme image 🖼</button>
      </section>

      <section className="meme">
        <img src="https://i.imgflip.com/1bij.jpg" />
        <span className="top">One does not simply</span>
        <span className="bottom">Walk into Mordor</span>
      </section>
    </main>
  )
}
