const toggle = document.getElementById("theme-toggle");
const body = document.body;

// Load theme from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    toggle.textContent = "☀️";
  } else {
    toggle.textContent = "🌙";
  }
});

// Toggle theme and save to localStorage
toggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggle.textContent = "🌙";
  }
});
