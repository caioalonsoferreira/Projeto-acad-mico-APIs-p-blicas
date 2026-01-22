const container = document.getElementById("lista");
const input = document.getElementById("busca");

// Carrega séries iniciais
carregarPopulares();

function carregarPopulares() {
  fetch("https://api.tvmaze.com/shows")
    .then(res => {
      if (!res.ok) throw new Error("Erro na API");
      return res.json();
    })
    .then(data => renderizar(data.slice(0, 60)))
    .catch(() => {
      container.innerHTML = "<p> Erro ao carregar dados.</p>";
    });
}

// Função de busca
function buscar() {
  const termo = input.value.trim();

  if (termo === "") {
    carregarPopulares();
    return;
  }

  fetch(`https://api.tvmaze.com/search/shows?q=${termo}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        container.innerHTML = "<p> Nenhum resultado encontrado.</p>";
        return;
      }

      const resultados = data.map(item => item.show);
      renderizar(resultados);
    })
    .catch(() => {
      container.innerHTML = "<p> Erro na busca.</p>";
    });
}

// Renderização dinâmica
function renderizar(lista) {
  container.innerHTML = "";

  lista.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image?.medium || ''}">
      <h3>${item.name}</h3>
    `;
    card.onclick = () => {
      window.location.href = `detalhes.html?id=${item.id}`;
    };
    container.appendChild(card);
  });
}
