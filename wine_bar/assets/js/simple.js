async function loadJson(path) {
  const response = await fetch(path);
  return response.json();
}

function gbp(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }).format(value);
}

function renderFront(products) {
  const grid = document.querySelector("[data-wine-grid]");
  const buttons = [...document.querySelectorAll("[data-filter-buttons] .filter-button")];

  if (!grid) return;

  function draw(filter) {
    const shown = filter === "all" ? products : products.filter((wine) => wine.category === filter);

    buttons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.filter === filter);
    });

    if (!shown.length) {
      grid.innerHTML = '<div class="empty-note">No wines in this category in the sample list yet.</div>';
      return;
    }

    grid.innerHTML = shown.map((wine) => {
      const price = wine.purchasableOnline ? gbp(wine.promotionalPrice ?? wine.takeoutPrice ?? wine.bottleRetailPrice) : "Ask in bar";
      return `
        <article class="wine-card">
          <img src="${wine.mainImageUrl}" alt="${wine.altText}">
          <h2>${wine.title}</h2>
          <p class="wine-meta">${wine.regionLabel}</p>
          <p class="wine-price">${price}</p>
          <p class="wine-note">${wine.shortDescription}</p>
        </article>
      `;
    }).join("");
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => draw(button.dataset.filter));
  });

  draw("all");
}

function renderAdmin(adminData) {
  const buttonsWrap = document.querySelector("[data-admin-buttons]");
  const tableWrap = document.querySelector("[data-admin-table]");

  if (!buttonsWrap || !tableWrap) return;

  const tableNames = Object.keys(adminData.tables);

  buttonsWrap.innerHTML = tableNames.map((name, index) => `
    <button class="admin-button ${index === 0 ? "is-active" : ""}" data-table="${name}" type="button">
      ${name.replaceAll("_", " ")}
    </button>
  `).join("");

  function draw(name) {
    const rows = adminData.tables[name] || [];
    const headers = rows.length ? Object.keys(rows[0]) : [];

    [...buttonsWrap.querySelectorAll(".admin-button")].forEach((button) => {
      button.classList.toggle("is-active", button.dataset.table === name);
    });

    tableWrap.innerHTML = `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                ${headers.map((header) => `<td>${row[header] || ""}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  buttonsWrap.querySelectorAll(".admin-button").forEach((button) => {
    button.addEventListener("click", () => draw(button.dataset.table));
  });

  draw(tableNames[0]);
}

async function init() {
  const page = document.body.dataset.page;

  if (page === "front") {
    const products = await loadJson("data/public-products.json");
    renderFront(products);
  }

  if (page === "admin") {
    const adminData = await loadJson("data/admin-data.json");
    renderAdmin(adminData);
  }
}

init();
