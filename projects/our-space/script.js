const url = "https://apis.scrimba.com/jsonplaceholder/posts";

fetch(url)
  .then(res => res.json())
  .then(data => {
    handlePages(data);
  });

function handlePages(postsArr) {
  customElements.define(
    "blogs-post",
    class extends HTMLElement {
      constructor() {
        // Runs first
        super();

        // Elements
        this.pageNo = this.querySelector("#pageNo");
        this.btnPrev = this.querySelector("#btnPrev");
        this.btnNext = this.querySelector("#btnNext");
        this.postsNL = this.querySelectorAll(".post");

        // Variables
        this.currPage = 1;
        this.entriesPerPage = this.postsNL.length;
        this.totalPages = Math.ceil(postsArr.length / this.entriesPerPage);

        // Events
        this.btnPrev.addEventListener("click", this);
        this.btnNext.addEventListener("click", this);

        // Init
        this.updatePage(0);
      }

      // Event handlers
      handleEvent(e) {
        e.target.id == "btnPrev" && this.updatePage(-1);
        e.target.id == "btnNext" && this.updatePage(1);
      }

      // Utility functions
      updatePage(N) {
        if (N < 0 && this.currPage == 1) return;
        if (N > 0 && this.currPage == this.totalPages) return;

        this.currPage += N;
        this.pageNo.textContent = this.currPage;

        const pages = this.currPage * this.entriesPerPage;
        this.fromPage = pages - this.entriesPerPage;
        this.toPage = Math.min(pages, postsArr.length);

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
      }
    }
  );
}
