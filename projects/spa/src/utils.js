const url = import.meta.env.VITE_BACKEND_URL;

export async function getDatafromAPI(ingredients) {
  const endpoint = "/recipe";
  const jsonData = JSON.stringify({ ingredients });

  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  };

  try {
    const { recipe } = await fetch(url + endpoint, opts).then(res =>
      res.json()
    );

    return recipe;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getMemefromAPI() {
  const endpoint = "/rand_meme";

  try {
    const meme = await fetch(url + endpoint).then(res => res.json());

    return meme;
  } catch (error) {
    console.error(error.message);
  }
}

export function pingHost() {
  try {
    fetch(url);
  } catch (error) {
    console.error(error.message);
  }
}
