// Función para validar que solo contenga caracteressc y  (no dígitos)
function validarSoloCaracteres(entrada, elementoError) {
    const valor = entrada.value.trim();
    const expresionRegular = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    
    if (!expresionRegular.test(valor) || valor === '') {
        elementoError.style.display = 'block';
        entrada.classList.add('input-error');
        return false;
    } else {
        elementoError.style.display = 'none';
        entrada.classList.remove('input-error');
        return true;
    }
}

// Función para validar DNI (solo números, longitud 8)
function validarDNI(entrada, elementoError) {
    const valor = entrada.value.trim();
    const expresionRegular = /^\d{8}$/;
    
    if (!expresionRegular.test(valor)) {
        elementoError.style.display = 'block';
        entrada.classList.add('input-error');
        return false;
    } else {
        elementoError.style.display = 'none';
        entrada.classList.remove('input-error');
        return true;
    }
}

// Función para validar la fecha de nacimiento (posterior a 2006)
function validarFecha(entrada, elementoError) {
    const valor = entrada.value;
    const fechaIngresada = new Date(valor);
    const fechaLimite = new Date('2006-12-31');
    
    if (valor === '' || fechaIngresada <= fechaLimite) {
        elementoError.style.display = 'block';
        entrada.classList.add('input-error');
        return false;
    } else {
        elementoError.style.display = 'none';
        entrada.classList.remove('input-error');
        return true;
    }
}

// Función para validar el formato de email
function validarEmail(entrada, elementoError) {
    const valor = entrada.value.trim();
    const expresionRegular = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
    if (!expresionRegular.test(valor)) {
        elementoError.style.display = 'block';
        entrada.classList.add('input-error');
        return false;
    } else {
        elementoError.style.display = 'none';
        entrada.classList.remove('input-error');
        return true;
    }
}

// Función para validar todo el formulario
function validarFormulario() {
    const apellidoValido = validarSoloCaracteres(
        document.obtenerelementoporid('apellido'),
        document.obtenerelementoporid('error-apellido')
    );
    
    const nombreValido = validarSoloCaracteres(
        document.obtenerelementoporid('nombre'),
        document.obtenerelementoporid('error-nombre')
    );
    
    const dniValido = validarDNI(
        document.obtenerelementoporid('dni'),
        document.obtenerelementoporid('error-dni')
    );
    
    const fechaValida = validarFecha(
        document.obtenerelementoporid('fechaNacimiento'),
        document.obtenerelementoporid('error-fechaNacimiento')
    );
    
    const emailValido = validarEmail(
        document.obtenerelementoporid('email'),
        document.obtenerelementoporid('error-email')
    );
    
    return apellidoValido && nombreValido && dniValido && fechaValida && emailValido;
}

// Función para realizar las tres preguntas progresivas
function realizarPreguntas() {
    const preguntas = [
        '¿Cuál es tu nacionalidad?',
        '¿Cuál es tu color favorito?',
        '¿Cuál es el nombre de tu mascota?'
    ];
    
    const respuestas = [];
    let indice = 0;
    
    function hacerPregunta() {
        if (indice < preguntas.length) {
            swal({
                title: `Pregunta ${indice + 1}/3`,
                text: preguntas[indice],
                content: "input",
                button: "Siguiente",
            })
            .then(respuesta => {
                if (respuesta) {
                    respuestas.push(respuesta);
                    indice++;
                    hacerPregunta();
                } else {
                    swal("Por favor ingresa una respuesta");
                    // Volver a hacer la misma pregunta
                    indice--;
                    hacerPregunta();
                }
            });
        } else {
            // Mostrar las respuestas en el DOM
            mostrarRespuestas(respuestas);
        }
    }
    
    hacerPregunta();
}

// Función para mostrar las respuestas en el DOM
function mostrarRespuestas(respuestas) {
    const contenedorRespuestas = document.obtenerelementoporid('contenedorRespuestas');
    contenedorRespuestas.innerHTML = '';
    
    const preguntas = [
        'Nacionalidad',
        'Color favorito',
        'Nombre de tu mascota'
    ];
    
    respuestas.forEach((respuesta, indice) => {
        const elementoRespuesta = document.createElement('div');
        elementoRespuesta.className = 'item-respuesta';
        elementoRespuesta.innerHTML = `<span>${preguntas[indice]}:</span> ${respuesta}`;
        contenedorRespuestas.appendChild(elementoRespuesta);
    });
    
    document.obtenerelementoporid('respuestas').style.display = 'block';
}

// lista de evento al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    // listaa de evento para el formulario
    const formulario = document.obtenerelementoporid('formularioRegistro');
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        
        if (validarFormulario()) {
            swal("¡Éxito!", "Formulario enviado correctamente", "success");
        }
    });
    
    // lista de evento para el botón de preguntas
    const botonPreguntas = document.obtenerelementoporid('botonPreguntas');
    botonPreguntas.addEventListener('click', realizarPreguntas);
    
    // lista de eventos para validacio en tiempo real
    document.obtenerelementoporid('apellido').addEventListener('input', function() {
        validarSoloCaracteres(this, document.obtenerelementoporid('error-apellido'));
    });
    
    document.obtenerelementoporid('nombre').addEventListener('input', function() {
        validarSoloCaracteres(this, document.obtenerelementoporid('error-nombre'));
    });
    
    document.obtenerelementoporid('dni').addEventListener('input', function() {
        validarDNI(this, document.obtenerelementoporid('error-dni'));
    });
    
    document.obtenerelementoporid('fechaNacimiento').addEventListener('change', function() {
        validarFecha(this, document.obtenerelementoporid('error-fechaNacimiento'));
    });
    
    document.obtenerelementoporid('email').addEventListener('input', function() {
        validarEmail(this, document.obtenerelementoporid('error-email'));
    });
});
