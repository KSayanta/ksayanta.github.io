import { useState, useEffect, useRef } from "react";
import { getMemefromAPI } from "../../src/utils";
import TextBox from "./TextBox";
import CaptionText from "./CaptionText";
import "./Main.css";

let didInit = false;

export default function Main() {
  const [meme, setMeme] = useState({});
  const [caption, setCaption] = useState({});
  const parentRef = useRef(null);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      fetchMeme();
    }
  }, []);

  function fetchMeme() {
    getMemefromAPI().then(newMeme => {
      let obj = {};
      for (let i = 1; i <= newMeme.box_count; i++) {
        obj[`text${i}`] = "Sample";
      }
      setMeme(newMeme);
      setCaption(obj);
    });
  }

  return (
    <main className="wrapper wrapper__main">
      <section className="form">
        {meme.box_count > 0 && (
          <TextBox caption={caption} count={1} onChange={setCaption} />
        )}
        {meme.box_count > 1 && (
          <TextBox caption={caption} count={2} onChange={setCaption} />
        )}
        {meme.box_count > 2 && (
          <TextBox caption={caption} count={3} onChange={setCaption} />
        )}
        {meme.box_count > 3 && (
          <TextBox caption={caption} count={4} onChange={setCaption} />
        )}
        {meme.box_count > 4 && (
          <TextBox caption={caption} count={5} onChange={setCaption} />
        )}

        <button
          className="btn btn-cta"
          aria-label="Get a new meme image"
          onClick={fetchMeme}
        >
          New Meme 🖼
        </button>
      </section>

      <section className="meme">
        <img src={meme.url} />

        <div ref={parentRef} className="overlay">
          <CaptionText
            parentRef={parentRef}
            caption={caption}
            count={meme.box_count}
          />
        </div>
      </section>
    </main>
  );
}
