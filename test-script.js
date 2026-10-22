const TEST_MODAL_URL = new URL("test-modal.html", document.currentScript.src);

const testData = [
  {
    title: "Bienvenida",
    type: "welcome",
    content: `
      <div class="psyche-welcome-content">
        <img class="psyche-brand-mark" src="logo1.png" alt="PSYCHE">
        <h2>Una pausa para revisar cómo estás</h2>
        <p>Responde cinco preguntas pensando en las últimas dos semanas. No hay respuestas buenas o malas; el resultado es solo una invitación a reflexionar.</p>
        <ul class="psyche-welcome-benefits">
          <li><i data-lucide="clock-3" aria-hidden="true"></i><span><strong>Breve:</strong> te tomará alrededor de dos minutos.</span></li>
          <li><i data-lucide="lock-keyhole" aria-hidden="true"></i><span><strong>Privado:</strong> tus respuestas no se envían ni se guardan.</span></li>
          <li><i data-lucide="heart-handshake" aria-hidden="true"></i><span><strong>Orientativo:</strong> no es una evaluación ni establece diagnósticos.</span></li>
        </ul>
        <p style="font-size: 13px; color: #64748b; font-style: italic; margin-top: 10px;">Si estás en peligro o necesitas ayuda urgente, contacta los servicios de emergencia de tu localidad.</p>
        <div style="margin-top: 25px; text-align: right;">
          <button type="button" class="psyche-btn psyche-btn-primary" onclick="siguientePaso()">Comenzar <i data-lucide="arrow-right" aria-hidden="true"></i></button>
        </div>
      </div>
    `
  },
  {
    title: "Pregunta 1",
    subtitle: "En las últimas dos semanas, ¿con qué frecuencia...?",
    questions: [
      { id: "bienestar-1", text: "Te ha costado desconectar de tus preocupaciones." },
      { id: "bienestar-2", text: "Te has sentido con poca energía o motivación." },
      { id: "bienestar-3", text: "La tensión o inquietud ha sido difícil de manejar." },
      { id: "bienestar-4", text: "Tus emociones han dificultado tus actividades cotidianas." },
      { id: "bienestar-5", text: "Has sentido que te faltaba tiempo para descansar y cuidarte." }
    ]
  }
];

const opcionesRespuesta = [
  { value: 0, label: "Nunca" },
  { value: 1, label: "Algunos días" },
  { value: 2, label: "Casi todos los días" }
];
const totalPreguntas = testData[1].questions.length;

let pasoActual = 0;
let respuestas = {};
let modalLoadPromise = null;
let elementoAnteriorAlModal = null;

function actualizarIconosTest() {
  if (window.lucide) window.lucide.createIcons();
}

function cargarTestModal() {
  if (!modalLoadPromise) {
    modalLoadPromise = fetch(TEST_MODAL_URL)
      .then(response => {
        if (!response.ok) throw new Error(`No se pudo cargar test-modal.html (${response.status}).`);
        return response.text();
      })
      .then(data => {
        document.body.insertAdjacentHTML("beforeend", data);
        actualizarIconosTest();
      })
      .catch(error => {
        modalLoadPromise = null;
        throw error;
      });
  }
  return modalLoadPromise;
}

document.addEventListener("DOMContentLoaded", () => {
  cargarTestModal().catch(error => console.error("Error al preparar la autoexploración:", error));
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && document.getElementById("psycheTestModal")?.style.display === "flex") {
    cerrarTestModal();
  }
});

async function abrirTestModal() {
  try {
    await cargarTestModal();
  } catch (error) {
    console.error("No fue posible abrir la autoexploración:", error);
    window.alert("No se pudo cargar la autoexploración. Comprueba tu conexión e inténtalo de nuevo.");
    return;
  }

  const modal = document.getElementById("psycheTestModal");
  if (!modal) throw new Error("No se encontró el contenedor de la autoexploración.");

  elementoAnteriorAlModal = document.activeElement;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  pasoActual = 0;
  respuestas = {};
  renderizarPaso();
  document.querySelector(".psyche-modal-content")?.focus();
}

function cerrarTestModal() {
  const modal = document.getElementById("psycheTestModal");
  if (modal) modal.style.display = "none";
  document.body.style.overflow = "";
  if (elementoAnteriorAlModal instanceof HTMLElement) elementoAnteriorAlModal.focus();
}

function reiniciarTest() {
  pasoActual = 0;
  respuestas = {};
  renderizarPaso();
  const modalContent = document.querySelector(".psyche-modal-content");
  if (modalContent) modalContent.scrollTop = 0;
}

function actualizarBarraProgreso() {
  const fill = document.getElementById("psycheProgressFill");
  const bar = document.querySelector(".psyche-progress-bar");
  const label = document.getElementById("psycheProgressLabel");
  const percent = document.getElementById("psycheProgressPercent");
  const porcentaje = pasoActual === 0 ? 0 : Math.min(100, Math.round((pasoActual / totalPreguntas) * 100));

  if (fill) fill.style.width = `${porcentaje}%`;
  if (bar) bar.setAttribute("aria-valuenow", String(porcentaje));
  if (label) {
    label.textContent = pasoActual === 0
      ? "Bienvenida"
      : pasoActual > totalPreguntas
        ? "Resultados"
        : `Pregunta ${pasoActual} de ${totalPreguntas}`;
  }
  if (percent) percent.textContent = `${porcentaje}%`;
}

function siguientePaso() {
  if (pasoActual > 0 && pasoActual <= totalPreguntas) {
    const preguntaActual = testData[1].questions[pasoActual - 1];
    if (!Number.isInteger(respuestas[preguntaActual.id])) {
      document.getElementById(`q-box-${preguntaActual.id}`)?.classList.add("needs-answer");
      return;
    }
  }

  pasoActual++;
  if (pasoActual <= totalPreguntas) {
    renderizarPaso();
  } else {
    renderizarResultados();
  }
  const modalContent = document.querySelector(".psyche-modal-content");
  if (modalContent) modalContent.scrollTop = 0;
}

function pasoAnterior() {
  if (pasoActual > 0) {
    pasoActual--;
    renderizarPaso();
    const modalContent = document.querySelector(".psyche-modal-content");
    if (modalContent) modalContent.scrollTop = 0;
  }
}

function seleccionarOpcion(id, valor, btnElement) {
  respuestas[id] = valor;
  const parent = btnElement.parentElement;
  parent.querySelectorAll(".psyche-opt-btn").forEach(button => {
    const selected = button === btnElement;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  btnElement.closest(".psyche-question-box")?.classList.remove("needs-answer");
}

function renderizarPaso() {
  document.querySelector(".psyche-modal-content")?.classList.remove("is-results");
  actualizarBarraProgreso();
  const container = document.getElementById("psycheTestContainer");
  const bloque = pasoActual === 0 ? testData[0] : testData[1];
  if (!container || !bloque) return;

  if (bloque.type === "welcome") {
    container.innerHTML = bloque.content;
    actualizarIconosTest();
    return;
  }

  const pregunta = bloque.questions[pasoActual - 1];
  const respuestaActual = respuestas[pregunta.id];
  const preguntasRestantes = totalPreguntas - pasoActual;
  container.innerHTML = `
    <h2 class="psyche-step-title"><i data-lucide="sparkles" aria-hidden="true"></i>Pregunta ${pasoActual} de ${totalPreguntas}</h2>
    <p class="psyche-question-instructions">${bloque.subtitle}</p>
    <div class="psyche-question-box" id="q-box-${pregunta.id}">
      <p>${pregunta.text}</p>
      <div class="psyche-options" role="group" aria-label="Frecuencia de la experiencia">
        ${opcionesRespuesta.map(opcion => `
          <button type="button" class="psyche-opt-btn ${respuestaActual === opcion.value ? "selected" : ""}"
            aria-pressed="${respuestaActual === opcion.value}"
            onclick="seleccionarOpcion('${pregunta.id}', ${opcion.value}, this)">${opcion.label}</button>
        `).join("")}
      </div>
      <p class="psyche-validation-message" role="status">Elige una respuesta para continuar.</p>
    </div>
    <div class="psyche-nav-buttons">
      <button type="button" class="psyche-nav-back" onclick="pasoAnterior()" aria-label="Volver" title="Volver">
        <i data-lucide="arrow-left" aria-hidden="true"></i><span>Anterior</span>
      </button>
      <button type="button" class="psyche-btn psyche-btn-primary" onclick="siguientePaso()">
        ${preguntasRestantes === 0 ? "Ver reflexión" : "Siguiente"} <i data-lucide="arrow-right" aria-hidden="true"></i>
      </button>
    </div>
    <p class="psyche-disclaimer"><i data-lucide="info" aria-hidden="true"></i><span>Una reflexión personal, no un diagnóstico.</span></p>
  `;
  actualizarIconosTest();
}

function obtenerReflexion(puntaje) {
  if (puntaje <= 3) {
    return {
      title: "Parece que has encontrado algunos momentos de calma.",
      text: "Sigue prestando atención a lo que te ayuda a sentirte bien. Si algo te preocupa, también puedes buscar un espacio para hablarlo."
    };
  }
  if (puntaje <= 6) {
    return {
      title: "Algunas cosas podrían estar pesando en tu día a día.",
      text: "Quizá te ayude reservar un momento para descansar, hablar con alguien de confianza o explorar qué apoyo necesitas."
    };
  }
  return {
    title: "Parece que has estado atravesando días exigentes.",
    text: "No tienes que resolverlo todo a solas. Considera conversar con una profesional de salud mental sobre cómo te has sentido."
  };
}

function renderizarResultados() {
  const container = document.getElementById("psycheTestContainer");
  const modalContent = document.querySelector(".psyche-modal-content");
  if (!container) return;

  modalContent?.classList.add("is-results");
  actualizarBarraProgreso();
  const puntaje = testData[1].questions.reduce((total, pregunta) => total + (respuestas[pregunta.id] || 0), 0);
  const reflexion = obtenerReflexion(puntaje);
  const email = window.SITE_CONFIG?.contactEmail || "hola@tudominio.com";
  const correo = `mailto:${email}?subject=${encodeURIComponent("Consulta sobre atención psicológica")}`;

  container.innerHTML = `
    <div class="psyche-results-content">
      <img class="psyche-brand-mark" src="logo1.png" alt="PSYCHE">
      <h2>Gracias por hacer esta pausa</h2>
      <p>${reflexion.title}</p>
      <div class="psyche-result-card">
        <p>${reflexion.text}</p>
        <p>Este resultado solo resume tus respuestas de hoy. No mide tu salud mental, no establece ni descarta diagnósticos y no sustituye una conversación con una profesional.</p>
      </div>
      <p class="psyche-disclaimer"><i data-lucide="shield-check" aria-hidden="true"></i><span>Tus respuestas se procesan en esta página y no se envían ni se guardan.</span></p>
      <h3 class="psyche-next-title"><i data-lucide="footprints" aria-hidden="true"></i>Si quieres dar otro paso</h3>
      <p class="psyche-results-next">Puedes consultar disponibilidad y resolver tus dudas por correo, sin necesidad de compartir el resultado.</p>
      <div class="psyche-action-container">
        <a href="${correo}" class="psyche-action-btn psyche-whatsapp-btn"><i data-lucide="mail" aria-hidden="true"></i> Consultar por correo</a>
        <button type="button" class="psyche-action-btn psyche-calendar-btn" onclick="cerrarTestModal()"><i data-lucide="house" aria-hidden="true"></i> Volver a la página</button>
      </div>
      <p class="psyche-urgent-note">Si estás en peligro o necesitas ayuda inmediata, contacta los servicios de emergencia de tu localidad.</p>
      <div class="psyche-nav-buttons psyche-results-controls">
        <button type="button" class="psyche-nav-back" onclick="volverAResultadosAnterior()" aria-label="Revisar tus respuestas" title="Revisar tus respuestas">
          <i data-lucide="arrow-left" aria-hidden="true"></i><span>Revisar</span>
        </button>
        <button type="button" class="psyche-reset-link" onclick="reiniciarTest()" aria-label="Reiniciar autoexploración">
          <i data-lucide="rotate-ccw" aria-hidden="true"></i><span>Reiniciar</span>
        </button>
      </div>
    </div>
  `;
  actualizarIconosTest();
}

function volverAResultadosAnterior() {
  pasoActual = totalPreguntas;
  renderizarPaso();
  const modalContent = document.querySelector(".psyche-modal-content");
  if (modalContent) modalContent.scrollTop = 0;
}
