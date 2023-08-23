var repartosElem
var fecha
var totalElem
var repartoID

var date = new Date()

var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
var days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
var total = 0

function showDeliveries(deliveries) {
  for (const delivery of deliveries) {
    if ((delivery["alta"] == "false") || (delivery[days[date.getDay()]] == 0)) continue
    const del = document.createElement("div")
    del.innerHTML = `<p><strong>(${delivery[days[date.getDay()]]})</strong> ${delivery.direccion}</p>`

    repartosElem.appendChild(del)
    total += delivery[days[date.getDay()]]
  }

  totalElem.innerText = `Ejemplares ${total}`
}

function clearDeliveries() {
  repartosElem.innerHTML = "";
  total = 0
}

async function loadDeliveries() {
  clearDeliveries()
  const response = await fetch(`./reparto${repartoID.value}.json`)
  if (response.status == 200) {
    const deliveries = await response.json()
    showDeliveries(deliveries)
  } else {
    const elem = document.createElement("p");
    elem.innerText = `El reparto ${repartoID.value} no existe o no se ha añadido aún a la base de datos.`
    repartosElem.appendChild(elem)
  }  
}

document.onreadystatechange = function() {
  if (document.readyState == "complete") {
    // Start application
    
    repartosElem = document.querySelector(".repartos")
    fecha = document.querySelector(".fecha")
    totalElem = document.querySelector(".total")
    repartoID = document.querySelector("#reparto")
    
    repartoID.onkeyup = (event) => {
      if (event.key == "Enter") loadDeliveries()
    }
    
    fecha.innerText = `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
    //loadDeliveries()
  }
}