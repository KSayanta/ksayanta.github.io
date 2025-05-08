import { useState, useEffect } from 'react'
import { getMemefromAPI } from '../../src/utils'
import TextBox from "./TextBox";
import CaptionText from './CaptionText';
import './Main.css'

export default function Main() {
  const [meme, setMeme] = useState({})

  const [caption, setCaption] = useState({
    text1: "",
    text2: "",
    text3: "",
    text4: "",
    text5: "",
  })

  useEffect(() => {
    (async () => {
      await handleClick()
    })() // IIFE

  }, [])

  async function handleClick() {
    const newMeme = await getMemefromAPI()
    setMeme(newMeme)
  }

  return (
    <main className="wrapper wrapper__main">
      <section className="form">

        {meme.box_count > 0 &&
          <TextBox caption={caption} count={1} onChange={setCaption} />
        }
        {meme.box_count > 1 &&
          <TextBox caption={caption} count={2} onChange={setCaption} />
        }
        {meme.box_count > 2 &&
          <TextBox caption={caption} count={3} onChange={setCaption} />
        }
        {meme.box_count > 3 &&
          <TextBox caption={caption} count={4} onChange={setCaption} />
        }
        {meme.box_count > 4 &&
          <TextBox caption={caption} count={5} onChange={setCaption} />
        }

        <button
          className="btn btn-cta"
          aria-label="Get a new meme image"
          onClick={handleClick}
        >New Meme 🖼</button>
      </section>

      <section className="meme">
        <img src={meme.url} />

        <div className="overlay">
          <CaptionText caption={caption} count={meme.box_count} />
        </div>

      </section>
    </main >
  )
}
