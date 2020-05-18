let n = new Date();
//Año
let y = n.getFullYear();
//Mes
let m = n.getMonth() + 1;
//Día
let d = n.getDate();


document.getElementById("fecha_inicio").value = d + "/" + m + "/" + y;
