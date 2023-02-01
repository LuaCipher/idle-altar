//variaveis de instancia
let inventario_tag = document.querySelector(".titulo")
var inventario = document.querySelector("#inventariobox")
var altar = document.querySelector("#altarbox")

var level = 2
var item_have = 0
var item_limit = 50
const maxrarity = 15
const valor_base = 10


// <geradores>
function random_num(x, y) {
  return Math.floor(Math.random() * (y - x + 1) + x);
}
const Fcor = () => {
  switch (random_num(1, 6)) {
    case 1: return "verde-lima-claro-fosforecente";
    case 2: return "blue";
    case 3: return "dorado";
    case 4: return "purple";
    case 5: return "white";
    case 6: return "vermei";
    default:
      alert("error New_item random overflow (idk why)")
  }
}
const Fraridade = () => {
  let formula = (lvl) => {
    let multi = 0

    for(let i = 0; i < lvl -1; i++) multi += Math.random();

    return random_num(1, 100) * (multi + (lvl/2))
  }
  
  let gotcha = formula(level)
  let raridade = 1
  let limite = 80
  while (gotcha > limite) {
    if (raridade == maxrarity) break;
    raridade++
    limite = 80 + (800-80) * (raridade / maxrarity) ** 2;
  }
  return raridade
}

const Fvalor = (r) => {
  let formula = (lr) => {
    return lr == 1 ? 10 : valor_base * ((1.5 +(0.25*(lr-2)))*lr-1)
  }
  let min = r-1;
  min == 0 ? min = 5 : min = formula(min)

  let max = formula(r)

  return random_num(min, max)
}

function new_item(cor, raridade) {

  if (item_have < item_limit) {
    let item = document.createElement("div")
    item.setAttribute("class", "item " + cor + " rarity" + raridade)
    item.addEventListener("click", (who) => {
      who.target.classList.add("selecionado")
    })
    
    
    item.innerHTML= Fvalor(raridade).toString()
    inventario.appendChild(item)
    item_have++
    
    inv()
  }
}
function sell(){
  let selecionado = document.querySelector(".selecionado")
  selecionado.remove()
  item_have--
  inv()
}
function replace(local){
  //if (local == "inventario")
  if (local == "altar"){
    let selecionado = document.querySelector(".selecionado")
    altar.appendChild(selecionado)
    item_have--
    inv()
  }
}



// <reload> 
function inv() {
  inventario_tag.children[0].innerHTML = "(" + item_have;
  inventario_tag.children[1].innerHTML = item_limit + ")";
}
inv()

