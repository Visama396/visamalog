var repartosElem
var fechaElem
var totalElem
var repartoElem
var inicioElem
var userElem
var passwordElem

var canbelogged = false
var users
var user
var password
var repartoID
var options
var fecha = new Date()
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
var dias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
var total = 0

function loadOptions() {
  for (const option of options) {
    const op = document.createElement("option")
    op.value = option;
    op.innerText = option;

    repartoElem.appendChild(op);
  }

  repartoElem.value = options[1];
  repartoID = options[1];
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

async function loadLogIn() {
  const response = await fetch("./users.json")
  users = await response.json()
}

function checkUsers() {
  for(const user of users) {
    if (user.user != userElem.value) continue
    if (user.user == userElem.value && user.pass == passwordElem.value) {
      loggedin()
    }
  }
}

function loggedin() {
  let elem = document.querySelector("#login")
  elem.classList.remove("loggedout")
  elem.classList.add("loggedin")
}

document.onreadystatechange = function() {
  if (document.readyState == "complete") {
    // Start application
    loadLogIn()

    if (canbelogged) {
      repartosElem = document.querySelector(".repartos")
      fechaElem = document.querySelector("#fecha")
      totalElem = document.querySelector(".total")
      repartoElem = document.querySelector("#reparto")
      inicioElem = document.querySelector("#inicio")
      userElem = document.querySelector("#user")
      passwordElem = document.querySelector("#password")
  
      loadOptions()
      
      repartoElem.onchange = (event) => {
        repartoID = repartoElem.value
        loadDeliveries()
      }
  
      inicioElem.onsubmit = (event) => {
        checkUsers()
        return false
      }
      
      fechaElem.value = `${fecha.getFullYear()}-${(fecha.getMonth()+1 < 10)?("0"+(fecha.getMonth()+1)):(fecha.getMonth()+1)}-${fecha.getDate()}`
  
      fechaElem.onchange = function(event) {
        fecha = new Date(event.target.value)
        loadDeliveries()
      }
    }

    console.log(process.env.DB_HOST)
    
  }
}