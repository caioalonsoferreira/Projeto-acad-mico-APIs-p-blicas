const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const div = document.getElementById("detalhes");

fetch(`https://api.tvmaze.com/shows/${id}`)
  .then(res => res.json())
  .then(serie => {
    div.innerHTML = `
      <h1>${serie.name}</h1>
      <img src="${serie.image?.original}" width="300"><br><br>
      <p>${serie.summary}</p><br>
      <button onclick="assistir()">▶ Assistir</button>
    `;

    window.assistir = () => {
      window.location.href = `assistir.html?id=${serie.externals?.thetvdb || serie.id}`;
    };
  })
  .catch(() => {
    div.innerHTML = "<p>Erro ao carregar detalhes.</p>";
  });
