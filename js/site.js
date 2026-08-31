// Published links use canonical directory URLs. Only file previews need index.html.
if (window.location.protocol === "file:") {
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href.startsWith("#")) return;

    const target = new URL(href, window.location.href);
    if (target.protocol === "file:" && target.pathname.endsWith("/")) {
      target.pathname += "index.html";
      link.href = target.href;
    }
  });
}

document.querySelectorAll(".navbar-toggler").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.bsTarget);
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    target?.classList.toggle("show", !isExpanded);
    button.setAttribute("aria-expanded", String(!isExpanded));
  });
});

document.querySelectorAll("#mainNav a[href^='#']").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = link.closest(".navbar-collapse");

    if (!menu?.classList.contains("show")) return;

    menu.classList.remove("show");
    document
      .querySelector(`[aria-controls="${menu.id}"]`)
      ?.setAttribute("aria-expanded", "false");
  });
});
