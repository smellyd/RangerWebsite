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
