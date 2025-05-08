import { useState } from 'react'
import { getMemefromAPI } from '../../src/utils'
import './Main.css'

export default function Main() {
  const [meme, setMeme] = useState({
    imageUrl: "https://i.imgflip.com/1bij.jpg",
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
  })

  function handleChange(e) {
    const { value, name } = e.currentTarget
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
  }

  async function handleGetNewMeme() {
    const newMeme = await getMemefromAPI()
    setMeme(prevMeme => ({
      ...prevMeme,
      imageUrl: newMeme.url
    }))
  }

  return (
    <main className="wrapper__main">
      <section className="form">
        <label htmlFor="topText">Text 1</label>
        <input
          type="text"
          maxLength={30}
          id="topText"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />

        <label htmlFor='bottomText'>Text 2</label>
        <input
          type="text"
          maxLength={30}
          id="bottomText"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />

        <button
          className="btn btn-cta"
          aria-label="Get a new meme image"
          onClick={handleGetNewMeme}
        >New Meme 🖼</button>
      </section>

      <section className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </section>
    </main>
  )
}
