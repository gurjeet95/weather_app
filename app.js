const btn = document.getElementById('weather').elements[2]
btn.addEventListener('click', location)

function location() {
  const lkey = 'fb5d0c79e2b3ee1ef0f1'
  const city = document.getElementById('weather').elements[0].value
  const country = document.getElementById('weather').elements[1].value
  const uri = 'https://locationiq.org/v1/search.php?key='
  fetch(`${uri}${lkey}&format=json&city=${city}&country=${country}`)
    .then((res) => res.json())
    .then((data) => {

      weather(data[0].lat, data[0].lon)

    })
    .catch((e) => console.log(e, "something wents wrong"))
}

function weather(lat, lon) {
  const apiKey = 'f9b40a49a9c35ce765cf0eb1bc7bf58d'
  const uri = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast/daily?'
  fetch(`${uri}&lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=5&units=metric`)
    .then((res) => res.json())
    .then((data) => {
      const div = document.getElementById("display")
      const headerbtn = document.createElement("h1")
      const tempbtn = document.createElement("button")
      tempbtn.textContent = "change units"
      tempbtn.addEventListener('click', changeunits)
      headerbtn.appendChild(tempbtn)
      div.appendChild(headerbtn)
      for (let i = 0; i < 5; i++) {
        let date1 = new Date((data.list[i].dt) * 1000)
        const div1 = document.createElement("div")
        div1.setAttribute("class", "inner1")
        const h3 = document.createElement("h3")
        h3.textContent = getDay(date1.getDay())
        const h4 = document.createElement("h3")
        h4.textContent = date1.getDate() + " " + getMonth(date1.getMonth())
        const div2 = document.createElement("div")
        div2.setAttribute("class", "img")
        const imgh3 = document.createElement("h3")
        imgh3.textContent = data.list[i].weather[0].main
        const img = document.createElement("img")
        img.src = getImg(imgh3.textContent)

        const temp = document.createElement("h4")
        temp.setAttribute("id", "celcius")
        temp.setAttribute("class", "celcius")
        const spanmax = document.createElement("span")
        spanmax.setAttribute("id", "max")
        const spancelcius1 = document.createElement("span")
        spancelcius1.setAttribute("id", "cel1")
        const spancelcius2 = document.createElement("span")
        spancelcius2.setAttribute("id", "cel2")
        const spanslash = document.createElement("span")
        const spanmin = document.createElement("span")
        spanmin.setAttribute("id", "min")
        spanmax.textContent = data.list[i].temp.max
        spanmin.textContent = data.list[i].temp.min
        spancelcius1.textContent = "\xB0" + "C"
        spancelcius2.textContent = "\xB0" + "C"
        spanslash.textContent = "/"
        temp.appendChild(spanmax)
        temp.appendChild(spancelcius1)
        temp.appendChild(spanslash)
        temp.appendChild(spanmin)
        temp.appendChild(spancelcius2)
        const ul = document.createElement("ul")
        const l1 = document.createElement("li")
        l1.textContent = "humidity:" + data.list[i].humidity + "%"
        const l2 = document.createElement("li")
        l2.textContent = "pressure:" + Math.floor((data.list[i].pressure)) + " " + "hpa"
        const l3 = document.createElement("li")
        l3.textContent = "wind:" + data.list[i].speed + "m/s" + " " + getDirection(data.list[i].deg)
        ul.appendChild(l1)
        ul.appendChild(l2)
        ul.appendChild(l3)
        div2.appendChild(img)
        div2.appendChild(imgh3)
        div1.appendChild(h3)
        div1.appendChild(h4)
        div1.appendChild(div2)
        div1.appendChild(temp)
        div1.appendChild(ul)
        div.appendChild(div1)

      }
    })
    .catch((e) => console.log(e, "something wents wrong"))
}

function changeunits() {
  const h4 = document.getElementById("celcius")
  if (h4.className == "celcius") {
    const list = document.querySelectorAll("#max")
    for (let i = 0; i < list.length; i++) {
      list[i].textContent = Fahrenheit(list[i].textContent)
    }
    const list1 = document.querySelectorAll("#min")
    for (let i = 0; i < list1.length; i++) {
      list1[i].textContent = Fahrenheit(list1[i].textContent)
    }
    const list2 = document.querySelectorAll("#cel1")
    for (let i = 0; i < list2.length; i++) {
      list2[i].textContent = "\xB0" + "F"
    }
    const list3 = document.querySelectorAll("#cel2")
    for (let i = 0; i < list3.length; i++) {
      list3[i].textContent = "\xB0" + "F"
    }
    h4.className = "fahren"
  } else {
    const list = document.querySelectorAll("#max")
    for (let i = 0; i < list.length; i++) {
      list[i].textContent = celcius(list[i].textContent)
    }
    const list1 = document.querySelectorAll("#min")
    for (let i = 0; i < list1.length; i++) {
      list1[i].textContent = celcius(list1[i].textContent)
    }
    const list2 = document.querySelectorAll("#cel1")
    for (let i = 0; i < list2.length; i++) {
      list2[i].textContent = "\xB0" + "C"
    }
    const list3 = document.querySelectorAll("#cel2")
    for (let i = 0; i < list3.length; i++) {
      list3[i].textContent = "\xB0" + "C"
    }
    h4.className = "celcius"

  }

}

function getDay(day) {
  let arr = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
  return (arr[day])
}

function getMonth(month) {
  let arr = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
  return (arr[month])

}

function getImg(img) {
  if (img == "Rain") {
    return ("img/rain.png")
  } else if (img == "Clear") {
    return ("img/sunny.png")
  } else if (img == "Clouds") {
    return ("img/clouds.png")
  } else if (img == "Snow") {
    return ("img/snow.png")
  } else {
    return ("img/all.png")
  }
}

function getDirection(num) {

  let val = Math.floor((num / 22.5) + 0.5)
  let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return (arr[(val % 16)])
}

function Fahrenheit(value) {

  return ((value * (9 / 5) + 32).toFixed(2))

}

function celcius(value) {
  return (((value - 32) / 1.8).toFixed(2))
}