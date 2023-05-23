const form = document.querySelector(".search-container")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const cityName = document.querySelector("#city").value
    document.activeElement.blur();
    if (cityName !== "") {
        const loader = document.querySelector(".loader")
        const container = document.querySelector(".container")
        loader.style.visibility = "visible"
        container.style.display = "none"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=1b95d864e8b125f57fbc08894d3ff146&units=metric&lang=pt_br`

        const response = await fetch(url)
        const json = await response.json()

        if (json.cod === 200) {
            const speed = json.wind.speed * 3.6
            const clima = json.weather[0].description
            document.querySelector("#cityName").innerHTML = `${json.name}, ${json.sys.country}`
            document.querySelector(".temp-info").innerHTML = `${json.main.temp + "°C"} <br/> ${clima}`
            document.querySelector(".vento-info").innerHTML = (speed).toFixed(2) + "Km/h"
            if (speed < 18) {
                document.querySelector(".vento-ponto").style.transform = " rotate(-145deg)"
            } else if (speed > 18 && speed < 26) {
                document.querySelector(".vento-ponto").style.transform = " rotate(-90deg)"
            } else if (speed > 26 && speed < 40) {
                document.querySelector(".vento-ponto").style.transform = " rotate(-65deg)"
            } else if (speed > 40) {
                document.querySelector(".vento-ponto").style.transform = " rotate(-25deg)"
            }

            if (clima.includes("nuvens")) {
                document.querySelector(".clima").style.backgroundImage = 'url("https://www.infoescola.com/wp-content/uploads/2008/04/cumulus.jpg")'
            }
            else if (clima.includes("nuvens") || clima === "nublado") {
                document.querySelector(".clima").style.backgroundImage = 'url("https://img.freepik.com/fotos-premium/nuvens-de-tempestade-escuras-tornam-o-ceu-preto-a-chuva-esta-chegando-em-breve-belo-ceu-com-uma-luz-dramatica-as-vezes-uma-massa-de-nuvens-pesadas-carregada-fundo-abstrato-da-natureza_352173-3091.jpg")'
            }
            else if (clima === "céu limpo") {
                document.querySelector(".clima").style.backgroundImage = 'url("https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618_960_720.jpg")'
            }
            else if (clima.includes("chuva")) {
                document.querySelector(".clima").style.backgroundImage = 'url("https://irga.rs.gov.br/upload/recortes/201910/01142306_37975_GD.jpg")'
            } else if (clima === "névoa") {
                document.querySelector(".clima").style.backgroundImage = 'url("https://4.bp.blogspot.com/-ufdiuPaylDA/UY_gZkjJx8I/AAAAAAAAJ5o/1Ch-XFDn7IU/s400/Taylor-HIghway-Fog-2.jpg")'
            } else if (clima === neve || clima.includes("nevando")) {
                document.querySelector(".clima").style.backgroundImage = 'url("https://annphoto.net/wp-content/uploads/2021/02/13-dicas-para-fotografar-neve-um-guia-para-iniciantes.jpgfit750536ssl1-750x470.jpeg")'
            } else {
                document.querySelector(".clima").style.backgroundColor = "#00000040";
            }

            document.querySelector("#climaImg").src = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`
            loader.style.display = "none"
            container.style.display = "block"
            document.querySelector(".explain").style.display = "none"
            document.querySelector(".aviso").style.display = "none"

        } else {
            loader.style.visibility = "hidden"
            document.querySelector(".aviso").style.display = "block"
        }

    } else {
        alert("Digite o nome de uma cidade")
    }
})