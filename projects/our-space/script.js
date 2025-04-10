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
      static observedAttributes = ["entries"];

      constructor() {
        // Always runs first
        super();

        // Attach copy of template to light DOM
        const template = document.getElementById("blog-template").content;
        this.appendChild(template.cloneNode(true));

        // Variables
        this.currPage = 1;

        // Elements
        this.pageNo = this.querySelector("#pageNo");
        this.btnPrev = this.querySelector("#btnPrev");
        this.btnNext = this.querySelector("#btnNext");
        this.blogsWrapper = this.querySelector(".blogs");
        this.postTemplate = document.getElementById("post-template").content;

        // Events
        this.btnPrev.addEventListener("click", this);
        this.btnNext.addEventListener("click", this);
      }

      attributeChangedCallback(_Name, _OldVal, newVal) {
        this.entriesPerPage = newVal;
        this.totalPages = Math.ceil(postsArr.length / this.entriesPerPage);

        // Init
        this.updatePage();
      }

      // Event handlers
      handleEvent(e) {
        e.target.id == "btnPrev" && this.updatePage(-1);
        e.target.id == "btnNext" && this.updatePage(1);
      }

      // Utility functions
      updatePage(N = 0) {
        this.currPage += N;
        this.pageNo.textContent = this.currPage;

        const pages = this.currPage * this.entriesPerPage;
        this.fromPage = pages - this.entriesPerPage;
        this.toPage = Math.min(pages, postsArr.length);

        while (this.blogsWrapper.firstElementChild)
          this.blogsWrapper.removeChild(this.blogsWrapper.firstElementChild);

        postsArr.slice(this.fromPage, this.toPage).forEach(post => {
          const newBlogPost = this.postTemplate.cloneNode(true);
          const postHeading = newBlogPost.querySelector(".post-heading");
          const postBody = newBlogPost.querySelector(".post-body");

          postHeading.setAttribute("data-id", post.id);
          postHeading.textContent = post.title;
          postBody.textContent = post.body;

          this.blogsWrapper.appendChild(newBlogPost);
        });

        this.updateBtn();
      }

      updateBtn() {
        if (this.btnPrev.hasAttribute("disabled")) {
          this.btnPrev.removeAttribute("disabled");
          this.btnPrev.setAttribute("aria-disabled", "false");
        }

        if (this.btnNext.hasAttribute("disabled")) {
          this.btnNext.removeAttribute("disabled");
          this.btnNext.setAttribute("aria-disabled", "false");
        }

        if (this.currPage == 1) {
          this.btnPrev.setAttribute("disabled", "");
          this.btnPrev.setAttribute("aria-disabled", "true");
        }

        if (this.currPage == this.totalPages) {
          this.btnNext.setAttribute("disabled", "");
          this.btnNext.setAttribute("aria-disabled", "true");
        }
      }
    }
  );
}
