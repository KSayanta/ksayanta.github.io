import { useState, useEffect } from 'react'
import './Main.css'
const url = "https://api.imgflip.com/get_memes"

export default function Main() {
  const [memeArr, setMemeArr] = useState([])
  const [meme, setMeme] = useState({
    imageUrl: "https://i.imgflip.com/1bij.jpg",
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
  })

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setMemeArr(data.data.memes))
  }, [])

  function handleChange(e) {
    const { value, name } = e.currentTarget
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
  }

  function handleGetNewMeme() {
    const newImgUrl = memeArr[Math.floor(memeArr.length * Math.random())].url
    setMeme(prevMeme => ({
      ...prevMeme,
      imageUrl: newImgUrl
    }))
  }

  return (
    <main className="wrapper">
      <section className="form">
        <label htmlFor="topText">Top Text </label>
        <input
          type="text"
          placeholder="Enter top text"
          id="topText"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />

        <label htmlFor='bottomText'>Bottom Text</label>
        <input
          type="text"
          placeholder="Enter bottom text"
          id="bottomText"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />

        <button
          className="btn btn-cta"
          onClick={handleGetNewMeme}
        >Get a new meme image 🖼
        </button>

      </section>

      <section className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </section>
    </main>
  )
}
