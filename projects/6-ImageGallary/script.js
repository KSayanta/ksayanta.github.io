const imageContainer = document.querySelector(".image-container");
const url = "https://osu.ppy.sh/api/v2/seasonal-backgrounds";

const getData = async function () {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const json = await response.json();
    handleJSON(json);
  } catch (error) {
    console.error(error.message);
  }
};

const handleJSON = function (json) {
  json.backgrounds.forEach(element => {
    const imageCard = document.createElement("div");
    const newImage = document.createElement("img");
    const newAvatar = document.createElement("img");
    const newUserArea = document.createElement("span");
    const newUsername = document.createElement("p");

    newImage.src = element.url;
    newAvatar.src = element.user.avatar_url;
    newUsername.innerText = element.user.username;

    imageCard.classList.add("image-card");
    newImage.classList.add("image-card--content");
    newUserArea.classList.add("image-card--name");

    newUserArea.append(newAvatar);
    newUserArea.append(newUsername);

    imageCard.append(newImage);
    imageCard.append(newUserArea);

    imageContainer.append(imageCard);
  });
};

getData();
