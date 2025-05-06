export async function getDatafromAPI(ingredients) {
  const url = import.meta.env.VITE_BACKEND_URL;
  const jsonData = JSON.stringify({ ingredients });

  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  };

  try {
    const { recipe } = await fetch(url, opts).then(res => res.json());

    return recipe;
  } catch (error) {
    console.error(error.message);
  }
}
