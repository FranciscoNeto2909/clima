const form = document.querySelector(".search-container")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const cityName = document.querySelector("#city").value

    if (cityName !== "") {
        const loader = document.querySelector(".loader")
        const container = document.querySelector(".container")
        loader.style.visibility = "visible"
        container.style.display = "none"

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=1b95d864e8b125f57fbc08894d3ff146&units=metric&lang=pt_br`
        
        const response = await fetch(url)
        const json = await response.json()

        if (json.cod === 200) {
            const speed = json.wind.speed

            document.querySelector("#cityName").innerHTML = `${json.name}, ${json.sys.country}`
            document.querySelector(".temp-info").innerHTML = `${json.main.temp + "°C"} <br/> ${json.weather[0].description}`
            document.querySelector(".vento-info").innerHTML = (speed * 3.6).toFixed(2) + "Km/h"
            document.querySelector("#climaImg").src = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`
            loader.style.display = "none"
            container.style.display = "block"
            document.querySelector(".explain").style.display = "none"

        }else{
            loader.style.visibility = "hidden"
            document.querySelector(".aviso").style.display = "block"
        }
    } else {
        alert("Digite o nome de uma cidade")
    }
})