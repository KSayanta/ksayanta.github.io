const url = "https://apis.scrimba.com/jsonplaceholder/posts";

const entriesPerPage = 5;
const postNL = document.querySelectorAll(".post");

function handlePosts(A) {
  A.forEach((post, idx) => {
    const heading = postNL[idx].querySelector(".postHeading");
    const body = postNL[idx].querySelector(".postBody");
    heading.textContent = post.title;
    body.textContent = post.body;
  });
}

function handlePages(postsArr) {
  customElements.define(
    "blogs-post",
    class extends HTMLElement {
      constructor() {
        super();

        this.currPage = 1;
        this.totalPages = Math.ceil(postsArr.length / entriesPerPage);

        this.pageNo = this.querySelector("#pageNo");
        this.btnPrev = this.querySelector("#btnPrev");
        this.btnNext = this.querySelector("#btnNext");

        this.postsNL = this.querySelectorAll(".post");

        this.btnPrev.addEventListener("click", this);
        this.btnNext.addEventListener("click", this);

        this.updatePage = function (page) {
          if (Math.sign(page) < 0 && this.currPage == 1) return;
          if (Math.sign(page) > 0 && this.currPage == this.totalPages) return;

          this.currPage += page;
          this.pageNo.textContent = this.currPage;

          this.fromPage = this.currPage * entriesPerPage - entriesPerPage;
          this.toPage = Math.min(
            this.currPage * entriesPerPage,
            postsArr.length
          );

          this.postsNL.forEach(post => {
            const heading = post.querySelector(".postHeading");
            const body = post.querySelector(".postBody");
            heading.textContent = "";
            body.textContent = "";
            body.style.setProperty("--content", "none");
          });

          postsArr.slice(this.fromPage, this.toPage).forEach((post, idx) => {
            const postHeading = this.postsNL[idx].querySelector(".postHeading");
            const postBody = this.postsNL[idx].querySelector(".postBody");
            postHeading.textContent = post.title;
            postBody.textContent = post.body;
            postBody.style.setProperty("--content", "");
          });
        };

        this.pagePrev = function () {
          this.updatePage(-1);
        };

        this.pageNext = function () {
          this.updatePage(1);
        };
      }

      handleEvent(e) {
        e.target.id == "btnPrev" && this.pagePrev();
        e.target.id == "btnNext" && this.pageNext();
      }
    }
  );
}

const postsContent = fetch(url)
  .then(res => res.json())
  .then(data => {
    handlePosts(data.slice(0, 5));
    handlePages(data.slice(5, 33));
  });

/* customElements.define(
  "wc-count",
  class extends HTMLElement {
    constructor() {
      super();
      this.count = 0;
      this.button = this.querySelector("button");
      this.button.addEventListener("click", this);
      this.button.setAttribute("aria-live", "polite");
      this.btnCount = this.button.querySelector("#btnCount");
    }

    handleEvent() {
      this.count++;
      this.btnCount.textContent = this.count;
    }
  }
); */
