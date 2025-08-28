const API_URL = "https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1/users";

let users = [];
let currentPage = 1;
const usersPerPage = 10;
let sortState = { key: "name", dir: "asc" };


fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    users = Array.isArray(data) ? data : [];
    renderDashboard(users);
    applySortAndRender();
  })
  .catch((err) => console.error("Fetch failed:", err));


function renderDashboard(list) {
  document.getElementById("totalUsers").innerText = list.length;

  
  const counts = {};
  list.forEach((u) => {
    const d = new Date(u.createdAt);
    const label = d.toLocaleDateString("en-GB"); 
    counts[label] = (counts[label] || 0) + 1;
  });


  const labels = Object.keys(counts).sort((a, b) => {
    const [da, ma, ya] = a.split("/").map(Number);
    const [db, mb, yb] = b.split("/").map(Number);
    return new Date(ya, ma - 1, da) - new Date(yb, mb - 1, db);
  });

  const values = labels.map((l) => counts[l]);

  const barCtx = document.getElementById("usersPerDay").getContext("2d");
  const grad = barCtx.createLinearGradient(0, 0, 0, 400);
  grad.addColorStop(0, "#36D1DC");
  grad.addColorStop(1, "#5B86E5");

  new Chart(barCtx, {
    type: "bar",
    data: {
      labels,
      datasets: [{ label: "Users Created", data: values, backgroundColor: grad, borderRadius: 8 }]
    },
    options: {
      plugins: { legend: { display: false } },
      animation: { duration: 1000 },
      scales: { x: { ticks: { autoSkip: true, maxTicksLimit: 7 } } }
    }
  });


  const withAvatar = list.filter((u) => u.avatar && String(u.avatar).trim() !== "").length;
  const withoutAvatar = list.length - withAvatar;

  new Chart(document.getElementById("avatarDistribution"), {
    type: "doughnut",
    data: {
      labels: ["With Avatar", "Without Avatar"],
      datasets: [{ data: [withAvatar, withoutAvatar], backgroundColor: ["#4CAF50", "#FF9800"], hoverOffset: 20 }]
    },
    options: { plugins: { legend: { position: "bottom" } }, animation: { animateScale: true, animateRotate: true } }
  });

  // Recently Joined (Top 5)
  const recent = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  document.getElementById("recentUsers").innerHTML = recent
    .map((u) => `<li class="list-group-item"><img src="${u.avatar}" width="30" class="rounded-circle me-2"> ${u.name}</li>`)
    .join("");
}


function applySortAndRender() {
  const sorted = [...users].sort((a, b) => {
    if (sortState.key === "name") {
      return sortState.dir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else {
      return sortState.dir === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
  renderTable(sorted);
}

function renderTable(list) {
  const q = document.getElementById("search").value.toLowerCase();
  const filtered = list.filter(
    (u) => u.name.toLowerCase().includes(q) || (u.email && u.email.toLowerCase().includes(q))
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / usersPerPage));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * usersPerPage;
  const page = filtered.slice(start, start + usersPerPage);

  document.getElementById("userTable").innerHTML = page
    .map(
      (u) => `
      <tr>
        <td><img src="${u.avatar}" width="30" class="rounded-circle me-2"> ${u.name}</td>
        <td>${new Date(u.createdAt).toLocaleString()}</td>
        <td>${u.email || "N/A"}</td>
      </tr>`
    )
    .join("");

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  let html = `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="goToPage(${currentPage - 1})">&laquo;</a>
    </li>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<li class="page-item ${i === currentPage ? "active" : ""}">
               <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
             </li>`;
  }

  html += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="goToPage(${currentPage + 1})">&raquo;</a>
    </li>`;

  document.getElementById("pagination").innerHTML = html;
}

function goToPage(p) {
  if (p < 1) p = 1;
  currentPage = p;
  applySortAndRender();
}

function sortUsers(key) {
  if (sortState.key === key) {
    sortState.dir = sortState.dir === "asc" ? "desc" : "asc";
  } else {
    sortState.key = key;
    sortState.dir = "asc";
  }
  currentPage = 1;
  applySortAndRender();
}

document.getElementById("search").addEventListener("input", () => {
  currentPage = 1;
  applySortAndRender();
});

