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
    const imageCard = `
      <div class="image-card">
        <img
          class="image-card--content"
          src="${element.url}"
          alt=""
        />
        <span class="image-card--name">
          <img 
            src="${element.user.avatar_url}"
            alt=""
          />
          <p>${element.user.username}</p>
        </span>
      </div>
    `;

    imageContainer.insertAdjacentHTML("afterbegin", imageCard);
  });
};

getData();
