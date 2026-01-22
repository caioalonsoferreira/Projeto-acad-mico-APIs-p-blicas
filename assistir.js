const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.getElementById("player").src =
  `https://krakenflix.cx/api/stream?provider=vidfast&type=tv&id=${id}&season=1&episode=1`;
