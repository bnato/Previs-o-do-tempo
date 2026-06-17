// chave da API do OpenWeatherMap (gratuita)
var API_KEY = "bd5e378503939ddaee76f12ad7a97608";

// funcao principal que busca o clima
function buscarClima() {
  var cidade = document.getElementById("cidade").value;

  // verifica se o campo esta vazio
  if (cidade == "") {
    alert("Por favor, digite o nome de uma cidade!");
    return;
  }

  // esconde resultado e erro antes de buscar
  document.getElementById("resultado").style.display = "none";
  document.getElementById("erro").style.display = "none";
  document.getElementById("loading").style.display = "block";

  // monta a URL da API
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cidade + "&appid=" + API_KEY + "&units=metric&lang=pt_br";

  // faz a requisicao com Fetch API
  fetch(url)
    .then(function(resposta) {
      // verifica se deu certo
      if (!resposta.ok) {
        throw new Error("Cidade não encontrada");
      }
      return resposta.json();
    })
    .then(function(dados) {
      // esconde o loading
      document.getElementById("loading").style.display = "none";

      // pega os dados da resposta
      var nome = dados.name + ", " + dados.sys.country;
      var temp = Math.round(dados.main.temp);
      var desc = dados.weather[0].description;
      var icone = dados.weather[0].icon;
      var umidade = dados.main.humidity;
      var vento = dados.wind.speed;

      // coloca os dados na tela
      document.getElementById("nomeCidade").textContent = nome;
      document.getElementById("temperatura").textContent = temp + "°C";
      document.getElementById("descricao").textContent = "🌡️ " + desc.charAt(0).toUpperCase() + desc.slice(1);
      document.getElementById("umidade").textContent = "💧 Umidade: " + umidade + "%";
      document.getElementById("vento").textContent = "💨 Vento: " + vento + " m/s";
      document.getElementById("icone").src = "https://openweathermap.org/img/wn/" + icone + "@2x.png";

      // mostra o resultado
      document.getElementById("resultado").style.display = "block";
    })
    .catch(function(erro) {
      // se der erro, mostra mensagem
      document.getElementById("loading").style.display = "none";
      document.getElementById("erro").style.display = "block";
      console.log("Erro:", erro);
    });
}

// permite buscar apertando Enter
document.getElementById("cidade").addEventListener("keypress", function(evento) {
  if (evento.key === "Enter") {
    buscarClima();
  }
});