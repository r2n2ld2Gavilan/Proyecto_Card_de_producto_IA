// Productos disponibles
const productos = {
    "Odin 1": {
        nombre: "Odin 1",
        precioBase: 120,
        archivo: "Odin 1"
    },
    "Odin 2": {
        nombre: "Odin 2",
        precioBase: 125,
        archivo: "Odin 2"
    },
    "Odin 3": {
        nombre: "Odin 3",
        precioBase: 130,
        archivo: "Odin 3"
    },
    "Odin 4": {
        nombre: "Odin 4",
        precioBase: 135,
        archivo: "Odin 4"
    }
};

// Configuración de tallas
const tallas = {
    "38": {
        extra: 0,
        clase: "talla-38"
    },
    "40": {
        extra: 5,
        clase: "talla-40"
    },
    "42": {
        extra: 10,
        clase: "talla-42"
    }
};

// Elementos del HTML
const selectorModelo = document.getElementById("selectorModelo");
const nombreProducto = document.getElementById("nombreProducto");
const precioProducto = document.getElementById("precioProducto");
const imagenTenis = document.getElementById("imagenTenis");
const imagenModal = document.getElementById("imagenModal");
const selectorTalla = document.getElementById("talla");
const btnComprar = document.getElementById("btnComprar");
const colorBoxes = document.querySelectorAll(".color-box");

// Factura
const facturaNumero = document.getElementById("facturaNumero");
const facturaFecha = document.getElementById("facturaFecha");
const facturaProducto = document.getElementById("facturaProducto");
const facturaColor = document.getElementById("facturaColor");
const facturaTalla = document.getElementById("facturaTalla");
const facturaPrecioBase = document.getElementById("facturaPrecioBase");
const facturaExtraTalla = document.getElementById("facturaExtraTalla");
const facturaTotal = document.getElementById("facturaTotal");
const btnImprimirFactura = document.getElementById("btnImprimirFactura");

// Valores iniciales
let modeloActual = "Odin 1";
let colorActual = "blanco";
let tallaActual = "38";

// Imagen de respaldo
const imagenRespaldo = "Img/Odin 1 blanco.png";

// Calcular precio
function calcularPrecioFinal() {
    return productos[modeloActual].precioBase + tallas[tallaActual].extra;
}

// Fecha actual
function obtenerFechaActual() {
    const hoy = new Date();
    return hoy.toLocaleDateString("es-DO");
}

// Número de factura
function generarNumeroFactura() {
    return "FAC-" + Math.floor(100000 + Math.random() * 900000);
}

// Actualizar producto
function actualizarProducto() {
    const producto = productos[modeloActual];
    const talla = tallas[tallaActual];
    const precioFinal = calcularPrecioFinal();

    nombreProducto.textContent = producto.nombre;
    precioProducto.textContent = `$${precioFinal} USD`;

    const rutaImagen = `Img/${producto.archivo} ${colorActual}.png`;

    imagenTenis.src = rutaImagen;
    imagenModal.src = rutaImagen;

    imagenTenis.alt = `${producto.nombre} color ${colorActual}, talla ${tallaActual}`;
    imagenModal.alt = `${producto.nombre} color ${colorActual}, talla ${tallaActual}`;

    // Quitar tallas anteriores
    imagenTenis.classList.remove("talla-38", "talla-40", "talla-42");
    imagenModal.classList.remove("talla-38", "talla-40", "talla-42");

    // Agregar talla actual
    imagenTenis.classList.add(talla.clase);
    imagenModal.classList.add(talla.clase);
}

// Respaldo si no encuentra imagen
imagenTenis.onerror = function () {
    imagenTenis.src = imagenRespaldo;
};

imagenModal.onerror = function () {
    imagenModal.src = imagenRespaldo;
};

// Cambiar modelo
selectorModelo.addEventListener("change", function () {
    modeloActual = this.value;
    colorActual = "blanco";

    colorBoxes.forEach(color => color.classList.remove("active"));
    document.querySelector(".color-blanco").classList.add("active");

    actualizarProducto();
});

// Cambiar color
colorBoxes.forEach(box => {
    box.addEventListener("click", function () {
        colorBoxes.forEach(color => color.classList.remove("active"));
        this.classList.add("active");

        colorActual = this.getAttribute("data-color");

        actualizarProducto();
    });
});

// Cambiar talla
selectorTalla.addEventListener("change", function () {
    tallaActual = this.value;
    actualizarProducto();
});

// Comprar -> abre factura profesional
btnComprar.addEventListener("click", function () {
    const producto = productos[modeloActual];
    const precioFinal = calcularPrecioFinal();
    const extra = tallas[tallaActual].extra;

    facturaNumero.textContent = generarNumeroFactura();
    facturaFecha.textContent = obtenerFechaActual();
    facturaProducto.textContent = producto.nombre;
    facturaColor.textContent = colorActual.charAt(0).toUpperCase() + colorActual.slice(1);
    facturaTalla.textContent = tallaActual;
    facturaPrecioBase.textContent = `$${producto.precioBase} USD`;
    facturaExtraTalla.textContent = `$${extra} USD`;
    facturaTotal.textContent = `$${precioFinal} USD`;

    const modal = new bootstrap.Modal(document.getElementById("modalFactura"));
    modal.show();
});

// Imprimir
btnImprimirFactura.addEventListener("click", function () {
    window.print();
});

// Cargar inicial
actualizarProducto();