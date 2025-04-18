<!--Danna Lisseth Martínez Monterrubio. 19/03/25-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Anton&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="EstiloSuper.css">
    <title>Nombres Super Héroes</title>
</head>

<body>

<div class="form-container">
    <h1 id="titulo">NOMBRES DE HÉROES ALEATORIOS</h1>
    <form method="POST">
        <p>Ingresa tu nombre: </p><input type="text" name="Nombre" required><br>
        <p>Ingresa tu apellido: </p><input type="text" name="Apellido" required><br><br>
        <input type="submit" value="Buscar nombre de super héroe">
    </form>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = $_POST["Nombre"];
    $apellido = $_POST["Apellido"];

    $letraNombre = $nombre[0];  
    $letraApellido = $apellido[0]; 

    $arreglo1 = array("abeja", "burro", "caballo", "delfín", "elefante", "foca", "gato", "hiena", "iguana", "jinete", "koala", "león", "mono", "nutria", "ñu", "oso", "poderoso", "quetzal", "rana", "solitario", "tigre", "unicornio", "vaca", "wombat", "xoloitzcuintle", "yak", "zebra");
    $arreglo2 = array("artista", "bueno", "certero", "daltonico", "estrella", "fresa", "glotón", "hermoso", "jovial", "kiwi", "limón", "mango", "naranja", "ñu", "ojo", "papaya", "queso", "rábano", "sandía", "tomate", "uva", "vainilla", "waffle", "xocoyol", "yogurt", "zanahoria");

    function encontrarPalabra($letra, $arreglo) {
        foreach ($arreglo as $palabra) {
            if (strtolower($palabra[0]) == strtolower($letra)) {
                return $palabra;
            }
        }
        return "Desconocido";
    }

    $palabra1 = encontrarPalabra($letraNombre, $arreglo1);
    $palabra2 = encontrarPalabra($letraApellido, $arreglo2);

    echo "<br>$nombre $apellido, tu nombre de superhéroe es: <span class='nombre-superheroe'>$palabra1 $palabra2</span>";
}
?>
</div>



</body>
</html>
