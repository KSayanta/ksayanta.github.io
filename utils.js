export function scrollNavItem(navLinks, idx) {
  // @param: Node list containing navigation list
  // @param: idx of navigation item to set as active

  navLinks.forEach(nav => {
    if (nav.hasAttribute("aria-current")) {
      nav.removeAttribute("aria-current");
    }
  });

  navLinks.item(idx).setAttribute("aria-current", true);
}

export function handleNavLinks(entries, observer, navLinks, targets) {
  // @param: Default entries array
  // @param: Observer object
  // @param: Navigation items
  // @param: Target elements in bode section

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      scrollNavItem(navLinks, [...targets].indexOf(entry.target));
    }
  });
}

export function throttle(fn, delay) {
  // @param: Function to pass as arguement
  // @param: Delay in ms

  let isThr = false;

  return function (...args) {
    if (!isThr) {
      fn.apply(this, args);
      isThr = true;

      setTimeout(() => {
        isThr = false;
      }, delay);
    }
  };
}
