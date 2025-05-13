// DOM Elements
const imageContainer = document.querySelector(".image-container");
const imageLightBox = document.querySelector(".image-lightbox");
const imageLightBoxClose = document.querySelector(".image-lightbox__close-btn");
const btnPrevImageLightBox = document.querySelector(".image-lightbox__prev");
const btnNextImageLightBox = document.querySelector(".image-lightbox__next");
const btnPrevThumbnail = document.querySelector(".image-lightbox__thumb-prev");
const btnNextThumbnail = document.querySelector(".image-lightbox__thumb-next");
const imageSlidesContainer = document.querySelector(
  ".image-lightbox__slide-area"
);
const imageThumbnailsContainer = document.querySelector(
  ".image-lightbox__thumbnails"
);

// Global objects
let slideIdx = 0;

// Getting data from file
const getDatafromFile = async function () {
  try {
    const response = await fetch("./apiData.json");
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }
    const fileJSON = await response.json();
    handleJSON(fileJSON);
  } catch (error) {
    console.error(error.message);
  }
};

// Handler functions

function weightedRandom(arg) {
  const arr = [];

  arg.forEach(elm => {
    for (let i = 0; i < elm.weight; i++) {
      arr.push(elm.value);
    }
  });

  return function () {
    return arr[Math.floor(Math.random() * arr.length)];
  };
}

const handleJSON = function (jsonArr) {
  const cards = [
    { weight: 12, value: "normal" },
    { weight: 0, value: "tall" },
    { weight: 1, value: "wide" },
  ];
  const getRandomCard = weightedRandom(cards);
  const length = jsonArr.reduce(
    (previous, current) => previous + current.backgrounds.length,
    0
  );
  let count = 0;

  jsonArr.forEach(json => {
    json.backgrounds.forEach(element => {
      const imageURL = element.url;
      const avatarURL = element.user.avatar_url;
      const username = element.user.username;

      const imageCard = `
      <div class="image-card">
        <img
          ${getRandomCard()}=""
          class="image-card--content"
          src="${imageURL}"
          alt=""
        />
        <span class="image-card--name">
          <img
            src="${avatarURL}"
            alt=""
          />
          <p>${username}</p>
        </span>
      </div>
    `;

      const imageLightBoxSlide = `
      <div class="image-lightbox__slides">
        <div class="image-lightbox__caption-wrapper">
          <p class="image-lightbox__caption">Image by ${username}</p>
          <a href="${imageURL}" target="_blank">See full image</a>
          <p class="image-lightbox__slide-number">${++count}/${length}</p>
        </div>
        <img src="${imageURL}" alt="" />
      </div>
    `;

      const imageThumbnail = `
      <img class="demo" src="${imageURL}" alt="" />
    `;

      imageContainer.insertAdjacentHTML("beforeend", imageCard);
      imageSlidesContainer.insertAdjacentHTML("beforeend", imageLightBoxSlide);
      imageThumbnailsContainer.insertAdjacentHTML("beforeend", imageThumbnail);
    });
  });

  // Adding event listners in image cards
  imageContainer.querySelectorAll(".image-card").forEach((card, idx) => {
    card.addEventListener("click", () => {
      openLightBox();
      currentSlide(idx);
    });
  });

  // Adding event listners in thumbnails
  imageThumbnailsContainer
    .querySelectorAll(".image-lightbox__thumbnails img")
    .forEach((thumb, idx) => {
      thumb.addEventListener("click", () => {
        currentSlide(idx);
      });
    });
};

const openLightBox = function () {
  imageLightBox.style.display = "block";
};

const closeLightBox = function () {
  imageLightBox.style.display = "none";
};

const currentSlide = function (n) {
  showSlides((slideIdx = n));
};

const nextSlide = function (n) {
  showSlides((slideIdx += n));
};

const showSlides = function (n) {
  const slides = document.querySelectorAll(".image-lightbox__slides");
  const thumbs = document.querySelectorAll(".image-lightbox__thumbnails img");

  if (n >= slides.length) slideIdx = 0;
  if (n < 0) slideIdx = slides.length - 1;

  slides.forEach(slide => {
    slide.style.display = "none";
  });
  thumbs.forEach(thumb => {
    thumb.classList.remove("active");
  });

  slides.item(slideIdx).style.display = "block";
  thumbs.item(slideIdx).classList.add("active");

  scrollToView(thumbs.item(slideIdx));
};

const scrollThumb = function (n) {
  imageThumbnailsContainer.scrollBy({
    left: imageThumbnailsContainer.getBoundingClientRect().width * 0.5 * n,
    behavior: "smooth",
  });
};

const scrollToView = function (activeElement) {
  const parentRect = imageThumbnailsContainer.getBoundingClientRect();
  const childRect = activeElement.getBoundingClientRect();

  if (parentRect.right <= childRect.right) {
    activeElement.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  }

  if (parentRect.left >= childRect.left) {
    activeElement.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  }
};

const btnUpdateStatus = function () {
  const parentRect = imageThumbnailsContainer.getBoundingClientRect();
  const firstChildRect =
    imageThumbnailsContainer.firstElementChild.getBoundingClientRect();
  const lastChildRect =
    imageThumbnailsContainer.lastElementChild.getBoundingClientRect();

  if (firstChildRect.left >= parentRect.left) {
    btnPrevThumbnail.classList.add("inactive");
  } else {
    btnPrevThumbnail.classList.remove("inactive");
  }

  if (lastChildRect.right <= parentRect.right) {
    btnNextThumbnail.classList.add("inactive");
  } else {
    btnNextThumbnail.classList.remove("inactive");
  }
};

// Event listners
imageLightBoxClose.addEventListener("click", closeLightBox);

imageThumbnailsContainer.addEventListener("scroll", btnUpdateStatus, {
  passive: true,
});

btnPrevImageLightBox.addEventListener("click", () => {
  nextSlide(-1);
});

btnNextImageLightBox.addEventListener("click", () => {
  nextSlide(1);
});

btnPrevThumbnail.addEventListener("click", () => {
  scrollThumb(-1);
});

btnNextThumbnail.addEventListener("click", () => {
  scrollThumb(1);
});

// Main
getDatafromFile();
