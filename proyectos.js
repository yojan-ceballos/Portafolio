// Funciones de modal
function verProyecto(num) {
    const modal = document.getElementById(`proyecto${num}`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function cerrarProyecto(num) {
    const modal = document.getElementById(`proyecto${num}`);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-proyecto.active').forEach(m => {
            m.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// Filtros (con protección si el formulario no existe)
const filtersForm = document.getElementById('filtersForm');
if (filtersForm) {
    filtersForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const tipo = document.getElementById('tipo').value;
        const lenguaje = document.getElementById('lenguaje').value;
        const framework = document.getElementById('framework').value;

        document.querySelectorAll('.proyecto-card').forEach(card => {
            const match = (!tipo || card.dataset.tipo === tipo) &&
                          (!lenguaje || card.dataset.lenguaje === lenguaje) &&
                          (!framework || card.dataset.framework === framework);

            if (match) {
                card.style.display = 'block';
                // animación ligera al mostrar
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
}

// Animación inicial
window.addEventListener('load', () => {
    document.querySelectorAll('.proyecto-card').forEach((card, i) => {
        // estado inicial
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        // evita romper si ya hay una transición definida en CSS
        card.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 100);
    });
});


// Slider

let imagenes = [];
let indiceActual = 0;

// Detecta automáticamente TODAS las imágenes de la galería
document.addEventListener("DOMContentLoaded", () => {
    imagenes = Array.from(document.querySelectorAll('.galeria_ruralmente img'))
        .map(img => img.src);
});

function ActivarSlider(num) {
    const slider = document.getElementById('slider');
    indiceActual = num - 1;

    slider.classList.add('active');
    actualizarSlider();
}

function cerrarSlider() {
    document.getElementById('slider').classList.remove('active');
}

function cambiarSlide(direccion) {
    indiceActual += direccion;

    if (indiceActual < 0) indiceActual = imagenes.length - 1;
    if (indiceActual >= imagenes.length) indiceActual = 0;

    actualizarSlider();
}

function actualizarSlider() {
    document.getElementById('slider-img').src = imagenes[indiceActual];
    document.getElementById('slider-counter').textContent =
        `${indiceActual + 1} / ${imagenes.length}`;
}

/* Teclado */
document.addEventListener('keydown', (e) => {
    if (!document.getElementById('slider').classList.contains('active')) return;

    if (e.key === 'Escape') cerrarSlider();
    if (e.key === 'ArrowRight') cambiarSlide(1);
    if (e.key === 'ArrowLeft') cambiarSlide(-1);
});

