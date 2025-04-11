const edicion =document.getElementById("editar")
const bios = document.getElementById("bios");

function habilitaEdicion(){
   bios.contentEditable = true;
   bios.classList.add("editable")
   bios.focus();
   bios.onblur= () => bios.contentEditable = false;

}

edicion.addEventListener("click", habilitaEdicion)

function cambiarTema(){
    document.body.classList.toggle('modoOscuro');
}

function contadorVisitas(){
    let contador = localStorage.getItem('contadorVisitas') || 0;
    contador++;
    localStorage.setItem('contadorVisitas', contador);
    document.getElementById('contadorVisitas').innerText=contador;
}

window.onload=contadorVisitas; 