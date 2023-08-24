var repartosElem
var fechaElem
var totalElem
var repartoElem

var repartoID
var fecha = new Date()
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
var dias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
var total = 0

function loadOptions() {
  for(let i = 4; i < 32; i++) {
    const opt = document.createElement("option")
    opt.value = i;
    opt.innerText = i;

    repartoElem.appendChild(opt)
  }

  repartoElem.value = 24
  repartoID = 24
}

function showDeliveries(deliveries) {
  for (const delivery of deliveries) {
    if ((delivery["alta"] == "false") || (delivery[dias[fecha.getDay()]] == 0)) continue
    const del = document.createElement("div")
    del.innerHTML = `<p><strong>(${delivery[dias[fecha.getDay()]]})</strong> ${delivery.direccion}</p>`

    repartosElem.appendChild(del)
    total += delivery[dias[fecha.getDay()]]
  }

  totalElem.innerText = `Ejemplares ${total}`
}

function clearDeliveries() {
  repartosElem.innerHTML = "";
  total = 0
}

async function loadDeliveries() {
  clearDeliveries()
  const response = await fetch(`./reparto${repartoID}.json`)
  if (response.status == 200) {
    const deliveries = await response.json()
    showDeliveries(deliveries)
  } else {
    const elem = document.createElement("p");
    elem.innerText = `El reparto ${repartoID} no existe o no se ha añadido aún a la base de datos.`
    repartosElem.appendChild(elem)
  }  
}

document.onreadystatechange = function() {
  if (document.readyState == "complete") {
    // Start application
    
    repartosElem = document.querySelector(".repartos")
    fechaElem = document.querySelector("#fecha")
    totalElem = document.querySelector(".total")
    repartoElem = document.querySelector("#reparto")

    loadOptions()
    
    repartoElem.onchange = (event) => {
      repartoID = repartoElem.value
      loadDeliveries()
    }
    
    fechaElem.value = `${fecha.getFullYear()}-${(fecha.getMonth()+1 < 10)?("0"+(fecha.getMonth()+1)):(fecha.getMonth()+1)}-${fecha.getDate()}`

    fechaElem.onchange = function(event) {
      fecha = new Date(event.target.value)
      loadDeliveries()
    }
  }
}