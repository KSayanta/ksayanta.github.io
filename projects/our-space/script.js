const url = "https://apis.scrimba.com/jsonplaceholder/posts";
let postsArr = [];

// DOM Elements
const btnNewPost = document.getElementById("btn-new-post");
const postTemplate = document.getElementById("post-template").content;

// Custom elements
customElements.define(
  "modal-post",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const template = document.getElementById("form-template").content;
      this.appendChild(template.cloneNode(true));

      // Elements
      this.newPostForm = this.querySelector("#modal-form__post");
      this.btnExit = this.querySelector("#post-btn-exit");
      this.btnPost = this.querySelector("#post-btn");
      this.blogsWrapper = document.querySelector("blogs-post .blogs");

      this.btnExit.addEventListener("click", e => {
        e.preventDefault();
        this.closeModal();
      });

      this.btnPost.addEventListener("click", e => {
        e.preventDefault();
        const title = this.querySelector("#post-title").value;
        const body = this.querySelector("#post-body").value;
        const opt = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: title, body: body }),
        };

        fetch(url, opt)
          .then(res => res.json())
          .then(data => {
            postsArr.unshift(data);
            this.blogsWrapper.prepend(newBlogPost(data));
            this.blogsWrapper.removeChild(this.blogsWrapper.lastElementChild);
            this.closeModal();
          });
      });
    }

    // Handler functions
    closeModal() {
      document.body.removeChild(this);
    }
  }
);

// Event listners
btnNewPost.addEventListener("click", displayModal);

/**
 * Fetch posts from api
 */
fetch(url)
  .then(res => res.json())
  .then(data => {
    postsArr = data;
    displayPosts();
  });

/**
 * Handler functions
 */
function newBlogPost(post) {
  const newBlogPost = postTemplate.cloneNode(true);
  const postHeading = newBlogPost.querySelector(".post-heading");
  const postBody = newBlogPost.querySelector(".post-body");

  postHeading.setAttribute("data-id", post.id);
  postHeading.textContent = post.title;
  postBody.textContent = post.body;

  return newBlogPost;
}

function displayModal() {
  const modal = document.createElement("modal-post");
  document.body.appendChild(modal);
}

function displayPosts() {
  customElements.define(
    "blogs-post",
    class extends HTMLElement {
      static observedAttributes = ["entries"];

      constructor() {
        // Always runs first
        super();
      }

      connectedCallback() {
        // Attach copy of template to light DOM
        const template = document.getElementById("blog-template").content;
        this.appendChild(template.cloneNode(true));

        // Elements
        this.pageNo = this.querySelector("#pageNo");
        this.btnPrev = this.querySelector("#btnPrev");
        this.btnNext = this.querySelector("#btnNext");
        this.blogsWrapper = this.querySelector(".blogs");

        // Events
        this.btnPrev.addEventListener("click", this);
        this.btnNext.addEventListener("click", this);

        // Init
        this.updatePage();
      }

      attributeChangedCallback(_Name, _OldVal, newVal) {
        // Variables
        this.currPage = 1;
        this.entriesPerPage = newVal;
        this.totalPages = Math.ceil(postsArr.length / this.entriesPerPage);
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
          this.blogsWrapper.appendChild(newBlogPost(post));
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
