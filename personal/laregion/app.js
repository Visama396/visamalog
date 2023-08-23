var repartosElem
var fecha
var totalElem

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

  totalElem.innerText = `Periódicos ${total}`
}

async function loadDeliveries() {
  const response = await fetch("./repartos.json")
  const deliveries = await response.json()
  showDeliveries(deliveries)
}

document.onreadystatechange = function() {
  if (document.readyState == "complete") {
    // Start application
    
    repartosElem = document.querySelector(".repartos")
    fecha = document.querySelector(".fecha")
    totalElem = document.querySelector(".total")
    
    fecha.innerText = `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
    loadDeliveries()
  }
}