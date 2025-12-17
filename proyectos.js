
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

// Filtros
document.getElementById('filtersForm').addEventListener('submit', (e) => {
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

// Animación inicial
window.addEventListener('load', () => {
    document.querySelectorAll('.proyecto-card').forEach((card, i) => {
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 100);
    });
});