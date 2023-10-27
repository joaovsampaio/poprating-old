export const scrollWatcher = () => {
  const primaryHeader = document.querySelector(".primary-header");
  const watcher = document.createElement("div");

  watcher.setAttribute("data-scroll-watcher", "");
  primaryHeader?.before(watcher);

  const navObserver = new IntersectionObserver(
    (entries) => {
      primaryHeader?.classList.toggle("sticking", !entries[0].isIntersecting);
    },
    { rootMargin: "50px 0px 0px 0px" }
  );

  navObserver.observe(watcher);
};
