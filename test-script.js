// test-script.js

const WHATSAPP_CLINICA = "50362631168";
const LINK_CALENDAR = "https://calendar.app.google/aoNeNgeWQJg1RZPw7";
const LINK_WHATSAPP_AGENDA = "https://api.whatsapp.com/send/?phone=50362631168&text=%C2%A1Hola%21%20%F0%9F%91%8B%20He%20realizado%20el%20test%20de%20bienestar%20Psyche%20y%20me%20gustar%C3%ADa%20agendar%20una%20sesi%C3%B3n%20psicol%C3%B3gica%20para%20hablar%20sobre%20lo%20que%20estoy%20viviendo%20y%20recibir%20orientaci%C3%B3n.%20%F0%9F%92%9A&type=phone_number&app_absent=0";
const TEST_MODAL_URL = new URL("test-modal.html", document.currentScript.src);

// Bloques del test con mapeo de áreas y síntomas clínicos
const testData = [
  {
    title: "Bienvenida",
    type: "welcome",
    content: `
        <div class="psyche-welcome-content">
        <img class="psyche-brand-mark" src="logo1.png" alt="Psyche">
        <h2>Test de Bienestar Psicológico | Psyche</h2>
        <p>Dar el primer paso para entender lo que sientes requiere valentía. Este test breve te ayudará a identificar posibles señales de malestar o sobrecarga emocional que podrías estar experimentando en este momento.</p>
      <ul class="psyche-welcome-benefits">
        <li><i data-lucide="shield-check" aria-hidden="true"></i><span><strong>100% Anónimo y Confidencial:</strong> Tus respuestas son privadas. Ningún dato personal queda guardado en la plataforma.</span></li>
        <li><i data-lucide="heart-handshake" aria-hidden="true"></i><span><strong>Uso opcional:</strong> Si decides iniciar un proceso psicológico o agendar una sesión en Psyche, puedes compartir tus resultados; caso contrario, no es necesario.</span></li>
        <li><i data-lucide="clock-3" aria-hidden="true"></i><span><strong>Duración estimada:</strong> 5 a 10 minutos.</span></li>
      </ul>
      <p style="font-size: 13px; color: #64748b; font-style: italic; margin-top: 10px;">Nota: Esta herramienta funciona como una guía de exploración inicial y no sustituye un diagnóstico clínico profesional.</p>
      <div style="margin-top: 25px; text-align: right;">
        <button class="psyche-btn psyche-btn-primary" onclick="siguientePaso()">Iniciar test de bienestar <i data-lucide="arrow-right" aria-hidden="true"></i></button>
      </div>
      </div>
    `
  },
  {
    title: "Sección 1",
    subtitle: "En los últimos 3 meses...",
    areaName: "Fobia Social",
    categoryKey: "fobiaSocial",
    questions: [
      { id: "fs1", text: "¿Te has sentido con frecuencia con un grado elevado de nerviosismo o incomodidad al estar en grupo (por ejemplo, en una comida, reunión o evento)?", symptom: "Nerviosismo o incomodidad frecuente en grupos o reuniones." },
      { id: "fs2", text: "¿Has evitado con frecuencia situaciones sociales debido al malestar o nerviosismo que te generaban?", symptom: "Tendencia a evitar situaciones sociales por nerviosismo." }
    ]
  },
  {
    title: "Sección 2",
    subtitle: "En los últimos 3 meses, ¿has experimentado de forma repentina o inesperada alguno de los siguientes síntomas?",
    areaName: "Ataques de Pánico",
    categoryKey: "panico",
    questions: [
      { id: "pan1", text: "Palpitaciones o aceleración del ritmo cardíaco.", symptom: "Palpitaciones o aceleración del ritmo cardíaco." },
      { id: "pan2", text: "Sensación de falta de aire o dificultad para respirar.", symptom: "Sensación de falta de aire o dificultad para respirar." },
      { id: "pan3", text: "Sudoración excesiva, mareos o temblores.", symptom: "Sudoración excesiva, mareos o temblores." },
      { id: "pan4", text: "Sensación intensa de descontrol o de estar ante un peligro inminente para tu vida.", symptom: "Sensación intensa de descontrol o peligro inminente." },
      { id: "pan5", text: "Episodios repentinos de terror, miedo o susto intenso.", symptom: "Episodios repentinos de terror, miedo o susto intenso." }
    ]
  },
  {
    title: "Sección 3",
    subtitle: "En los últimos 3 meses...",
    areaName: "Ansiedad Generalizada",
    categoryKey: "ansiedadGen",
    questions: [
      { id: "ag1", text: "¿Te ha resultado difícil controlar o detener la preocupación constante?", symptom: "Dificultad para controlar o detener la preocupación constante." },
      { id: "ag2", text: "¿Tu preocupación ha interferido en tu desempeño laboral, tus tareas cotidianas o tus relaciones interpersonales?", symptom: "Interferencia de la preocupación en tareas cotidianas o relaciones." },
      { id: "ag3", text: "¿Sueles experimentar tensión corporal constante o dificultad para lograr relajarte?", symptom: "Tensión corporal constante y dificultad para relajarse." }
    ]
  },
  {
    title: "Sección 4",
    subtitle: "En los últimos 3 meses ... ",
    areaName: "Trastorno Obsesivo-Compulsivo (TOC)",
    categoryKey: "toc",
    questions: [
      { id: "toc1", text: "¿Has sentido la necesidad de contar objetos o repetir acciones un número determinado de veces?", symptom: "Necesidad de contar objetos o repetir acciones de forma repetitiva." },
      { id: "toc2", text: "¿Has dedicado tiempo excesivo a lavarte, desinfectarte o cambiarte de ropa por temor a la suciedad o contaminación?", symptom: "Lavado o desinfección excesiva por temor a la contaminación." },
      { id: "toc3", text: "¿Has sentido la necesidad compulsiva de comprobar cosas repetidamente (cerrojos, llaves o tareas)?", symptom: "Necesidad compulsiva de comprobar cosas repetidamente." },
      { id: "toc4", text: "¿Te han invadido ideas, imágenes o impulsos recurrentes e indeseados que no podías sacar de tu mente?", symptom: "Ideas o impulsos intrusivos recurrentes." },
      { id: "toc5", text: "¿Inviertes un tiempo significativo al día (hasta una hora o más) realizando estas comprobaciones o rituales?", symptom: "Inversión de tiempo diario significativo en rituales o comprobaciones." },
      { id: "toc6", text: "¿Has experimentado el deseo de detener estas conductas sin lograrlo por tu cuenta?", symptom: "Deseo no logrado de detener conductas repetitivas." }
    ]
  },
  {
    title: "Sección 5",
    subtitle: "Pensando en tu historia de vida...",
    areaName: "Estrés Postraumático",
    categoryKey: "ptsd",
    questions: [
      { id: "ptsd1", text: "¿Has experimentado o presenciado un evento de impacto aterrador, grave o traumático?", symptom: "Experiencia o vivencia de un evento traumático." },
      { id: "ptsd2", text: "¿Experimentas recuerdos, imágenes o pesadillas involuntarias sobre el evento que te generan malestar intenso?", symptom: "Reexperimentación de recuerdos o pesadillas involuntarias." },
      { id: "ptsd3", text: "¿Evitas lugares, conversaciones o pensamientos vinculados al evento, o te sientes en constante estado de alerta o sobresalto?", symptom: "Evitación de estímulos traumáticos e hiperalerta constante." }
    ]
  },
  {
    title: "Sección 6",
    subtitle: "En los últimos 3 meses...",
    areaName: "Trastornos de la Conducta Alimentaria",
    categoryKey: "tca",
    questions: [
      { id: "tca1", text: "¿Otras personas te han expresado preocupación por una pérdida de peso excesiva o delgadez?", symptom: "Preocupación de terceros por pérdida excesiva de peso." },
      { id: "tca2", text: "¿Has sentido malestar o insatisfacción constante con tu cuerpo por percepción de sobrepeso?", symptom: "Malestar o insatisfacción corporal constante." },
      { id: "tca3", text: "¿Ha habido periodos donde la comida o el peso ocuparon casi la totalidad de tus pensamientos?", symptom: "Pensamientos dominantes u obsesivos en torno a la comida y el peso." },
      { id: "tca4", text: "¿Evitas grupos enteros de alimentos por temor o experiencias negativas (no asociadas a indicaciones médicas)?", symptom: "Evitación restrictiva de grupos de alimentos." },
      { id: "tca5", text: "¿Has recurrido a conductas como vómito autoinducido, uso de laxantes/diuréticos, ayunos prolongados o ejercicio excesivo para compensar lo ingerido?", symptom: "Uso de conductas compensatorias (purgas, ayunos o ejercicio extremo)." },
      { id: "tca6", text: "¿Has tenido episodios de ingesta voraz de alimentos (atracones) acompañados de una sensación de pérdida de control?", symptom: "Episodios de atracones con sensación de pérdida de control." }
    ]
  },
  {
    title: "Sección 7",
    subtitle: "En los últimos 3 meses...",
    areaName: "Depresión y Estado de Ánimo",
    categoryKey: "depresion",
    questions: [
      { id: "dep1", text: "¿Has experimentado una pérdida de interés o placer en actividades que antes disfrutabas?", symptom: "Pérdida de interés o placer en actividades habituales (anhedonia)." },
      { id: "dep2", text: "¿Frecuentemente sientes fatiga o falta de energía incluso al realizar tareas sencillas?", symptom: "Fatiga frecuente o falta de energía." },
      { id: "dep3", text: "¿Te has sentido triste, desanimado/a o con un estado de ánimo bajo la mayor parte del tiempo?", symptom: "Estado de ánimo bajo, tristeza o desánimo recurrente." },
      { id: "dep4", text: "¿Has notado un aumento significativo en tu irritabilidad o mal humor ante situaciones menores?", symptom: "Aumento de la irritabilidad ante situaciones menores." },
      { id: "dep5", text: "¿Has tenido pensamientos recurrentes o serios sobre quitarte la vida o hacerte daño?", isCrisis: true, symptom: "Ideación de autolesión o pensamientos orientados a quitarse la vida." }
    ]
  },
  {
    title: "Sección 8",
    subtitle: "En los últimos 3 meses...",
    areaName: "Indicadores de Manía / Hipomanía",
    categoryKey: "mania",
    questions: [
      { id: "man1", text: "¿Has experimentado una necesidad inusual de moverte constantemente o un estado de agitación física?", symptom: "Necesidad inusual de movimiento constante o agitación física." },
      { id: "man2", text: "¿Has notado que hablas mucho más rápido de lo habitual o que a otros les cuesta interrumpirte?", symptom: "Aceleración en el ritmo del habla." },
      { id: "man3", text: "¿Has sentido una percepción de grandiosidad o capacidades especiales fuera de lo común?", symptom: "Percepción elevada de capacidades o grandiosidad." },
      { id: "man4", text: "¿Has sentido que tus pensamientos van a una velocidad excesiva o saltan rápidamente de un tema a otro?", symptom: "Fuga de ideas o velocidad excesiva en el pensamiento." },
      { id: "man5", text: "¿Has experimentado periodos de euforia o hiperactividad inusual que hayan causado preocupación en tu entorno?", symptom: "Episodios de euforia o hiperactividad inusual." }
    ]
  },
  {
    title: "Sección 9",
    subtitle: "De manera habitual...",
    areaName: "TDAH (Atención e Hiperactividad)",
    categoryKey: "tdah",
    questions: [
      { id: "tdah1", text: "¿Te resulta difícil mantener la concentración en tareas prolongadas o rutinarias?", symptom: "Dificultad para mantener la concentración en tareas prolongadas." },
      { id: "tdah2", text: "¿Olvidas con frecuencia compromisos, planes o tareas cotidianas?", symptom: "Olvidos frecuentes de compromisos o planes cotidianos." },
      { id: "tdah3", text: "¿Tiendes a evitar o posponer actividades que demandan un esfuerzo mental sostenido?", symptom: "Tendencia a posponer actividades que demandan esfuerzo mental." },
      { id: "tdah4", text: "¿Cometes errores por descuido al no poder fijar tu atención en los detalles?", symptom: "Errores por descuido al no fijar atención en los detalles." },
      { id: "tdah5", text: "¿Sientes una inquietud motora constante o dificultad para mantenerte sentado/a cuando se requiere?", symptom: "Inquietud motora o dificultad para permanecer sentado/a." }
    ]
  },
  {
    title: "Sección 10",
    type: "checklist",
    subtitle: "En los últimos 3 meses, ¿has consumido de forma recurrente alguna de las siguientes sustancias? (Selecciona todas las que apliquen):",
    areaName: "Consumo de Sustancias",
    categoryKey: "sustancias",
    options: [
      "Alcohol", "Marihuana o derivados", "Cocaína / Crack", 
      "Estimulantes o anfetaminas sin prescripción", "Sedantes / Ansiolíticos sin prescripción", 
      "Alucinógenos / Psicodélicos", "Opiáceos", "Inhalantes", "Otras sustancias", "Ninguna de las anteriores"
    ]
  },
  {
    title: "Sección 11",
    type: "checklist",
    subtitle: "En los últimos 3 meses, ¿te ha preocupado el uso excesivo o la falta de control en alguna de estas conductas?",
    areaName: "Comportamientos Problemáticos",
    categoryKey: "comportamientos",
    options: [
      "Autolesiones", "Juegos de azar / Apuestas", "Uso excesivo de pantallas e internet", 
      "Comportamiento compulsivo con la comida", "Conducta sexual o pornografía", 
      "Compras impulsivas", "Ninguna de las anteriores"
    ]
  },
  {
    title: "Sección 12",
    subtitle: "En los últimos 3 meses...",
    areaName: "Psicosis Temprana",
    categoryKey: "psicosis",
    questions: [
      { id: "psi1", text: "¿Has escuchado voces o sonidos cuando no había nadie más cerca?", symptom: "Percepción auditiva de voces o sonidos sin fuente externa." },
      { id: "psi2", text: "¿Has tenido la sensación de que pensamientos ajenos son introducidos en tu mente?", symptom: "Sensación de introducción o interferencia de pensamientos ajenos." },
      { id: "psi3", text: "¿Has percibido que tu entorno familiar o personas conocidas se vuelven extrañas o irreales?", symptom: "Sensación de extrañeza o irrealidad en el entorno familiar." },
      { id: "psi4", text: "¿Has visto sombras, figuras u objetos que otros no parecen percibir?", symptom: "Percepción visual de figuras u objetos no percibidos por otros." }
    ]
  },
  {
    title: "Sección 13",
    type: "context",
    subtitle: "Malestar General y Factores Desencadenantes",
    areaName: "Malestar General y Somático",
    categoryKey: "sintomasSomaticos",
    questions: [
      { id: "ctx1", text: "¿Buscas ayuda o acompañamiento psicológico para alguna situación específica en este momento?", symptom: "Búsqueda activa de acompañamiento psicológico." }
    ],
    checklists: [
      {
        id: "ctx2",
        title: "En las últimas semanas, ¿has experimentado alguno de los siguientes malestares? (Selecciona los que apliquen):",
        categoryKey: "sintomasSomaticos",
        options: [
          "Problemas de sueño (dificultad para conciliar el sueño, despertares nocturnos o insomnio)",
          "Agotamiento emocional (sensación constante de drenaje o sobrecarga mental)",
          "Somatizaciones (dolores físicos recurrentes sin causa médica clara, como tensión muscular o migrañas)",
          "Dificultad para tomar decisiones (bloqueo o parálisis ante elecciones cotidianas)",
          "Aislamiento voluntario (tendencia a retirarte o no querer saber de los demás)"
        ]
      },
      {
        id: "ctx3",
        areaName: "Factores y Situaciones Vitales",
        categoryKey: "factoresEstres",
        title: "¿Estás atravesando o has vivido recientemente alguna de las siguientes situaciones? (Selecciona las que apliquen):",
        options: [
          "Ruptura amorosa o separación",
          "Infidelidad o conflicto grave de pareja",
          "Conflictos familiares o relacionales",
          "Duelo o pérdida reciente (fallecimiento, separación, cambio de vida)",
          "Presión laboral, académica o agotamiento extremo (burnout)",
          "Dificultades económicas o inestabilidad financiera",
          "Baja autoestima o insatisfacción personal",
          "Experiencias de violencia, abuso o acoso",
          "Sensación de soledad profunda o falta de red de apoyo",
          "Cambios importantes de vida (mudanza, migración, cambio de empleo, maternidad/paternidad)",
          "Incertidumbre sobre el futuro o crisis existencial"
        ]
      }
    ]
  }
];

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
  cargarTestModal().catch(error => console.error("Error al preparar el test de bienestar:", error));
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
    console.error("No fue posible abrir el test de bienestar:", error);
    window.alert("No se pudo cargar el test. Comprueba tu conexión e inténtalo de nuevo.");
    return;
  }
  const modal = document.getElementById("psycheTestModal");
  if(modal) {
    elementoAnteriorAlModal = document.activeElement;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    pasoActual = 0;
    respuestas = {};
    renderizarPaso();
    document.querySelector(".psyche-modal-content")?.focus();
  }
}

function cerrarTestModal() {
  const modal = document.getElementById("psycheTestModal");
  if(modal) modal.style.display = "none";
  document.body.style.overflow = "";
  document.querySelectorAll(".psyche-crisis-overlay").forEach(overlay => overlay.remove());
  if (elementoAnteriorAlModal instanceof HTMLElement) elementoAnteriorAlModal.focus();
}

function reiniciarTest() {
  pasoActual = 0;
  respuestas = {};
  renderizarPaso();
  const modalContent = document.querySelector('.psyche-modal-content');
  if(modalContent) modalContent.scrollTop = 0;
}

function actualizarBarraProgreso() {
  const fill = document.getElementById("psycheProgressFill");
  const bar = document.querySelector(".psyche-progress-bar");
  const label = document.getElementById("psycheProgressLabel");
  const percent = document.getElementById("psycheProgressPercent");
  const porcentaje = Math.round((pasoActual / (testData.length - 1)) * 100);
  if (fill) fill.style.width = `${porcentaje}%`;
  if (bar) bar.setAttribute("aria-valuenow", String(porcentaje));
  if (label) {
    const totalSecciones = testData.filter(bloque => /^Sección \d+$/.test(bloque.title)).length;
    if (pasoActual > 0 && pasoActual < testData.length) {
      const seccionActual = Math.min(pasoActual, totalSecciones);
      const seccionesRestantes = totalSecciones - seccionActual;
      label.innerHTML = `<span class="psyche-section-progress-current">Sección ${seccionActual}/${totalSecciones}</span><span class="psyche-section-progress-remaining">${seccionesRestantes ? `Te faltan ${seccionesRestantes} ${seccionesRestantes === 1 ? "sección" : "secciones"}` : "Última sección"}</span>`;
    } else {
      label.textContent = testData[pasoActual]?.title || "Resultados";
    }
  }
  if (percent) percent.textContent = `${porcentaje}%`;
}

function siguientePaso() {
  pasoActual++;
  if(pasoActual < testData.length) {
    renderizarPaso();
    const modalContent = document.querySelector('.psyche-modal-content');
    if(modalContent) modalContent.scrollTop = 0;
  } else {
    renderizarResultados();
  }
}

function pasoAnterior() {
  if(pasoActual > 0) {
    pasoActual--;
    renderizarPaso();
    const modalContent = document.querySelector('.psyche-modal-content');
    if(modalContent) modalContent.scrollTop = 0;
  }
}

function seleccionarOpcion(id, valor, isCrisis, btnElement) {
  respuestas[id] = valor;
  const parent = btnElement.parentElement;
  parent.querySelectorAll('.psyche-opt-btn').forEach(b => b.classList.remove('selected'));
  btnElement.classList.add('selected');

  if(isCrisis && valor === "Sí") {
    mostrarModalCrisis();
  }

  const currentBox = btnElement.closest('.psyche-question-box');
  if (currentBox) {
    currentBox.classList.remove('active-focus');
    const nextBox = currentBox.nextElementSibling;
    if (nextBox && nextBox.classList.contains('psyche-question-box')) {
      nextBox.classList.add('active-focus');
      nextBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

function mostrarModalCrisis() {
  if (document.querySelector(".psyche-crisis-overlay")) return;
  const crisisDiv = document.createElement("div");
  crisisDiv.className = "psyche-crisis-overlay";
  crisisDiv.setAttribute("role", "dialog");
  crisisDiv.setAttribute("aria-modal", "true");
  crisisDiv.setAttribute("aria-labelledby", "psycheCrisisTitle1");

  crisisDiv.innerHTML = `
    <div id="psycheCrisisCard1" class="psyche-crisis-card" style="text-align: left;" tabindex="-1">
      <h2 id="psycheCrisisTitle1" style="color: #0d5c3f; margin-bottom: 15px; text-align: center;">💙 Tu bienestar es lo más importante</h2>
      <p style="font-size: 15px; line-height: 1.6; margin-bottom: 25px; color: #334155;">
        Notamos que estás atravesando un momento de mucho dolor. Tus vivencias son válidas y merecen ser escuchadas en un espacio seguro. Recuerda que no tienes que llevar este peso a solas.<br><br>
        <strong>Si en este momento sientes que estás en peligro o te cuesta mantener tu seguridad, por favor acude de inmediato al centro de salud u hospital más cercano o contacta a los servicios de emergencia de tu localidad.</strong>
      </p>
      <div style="text-align: center;">
        <button class="psyche-btn psyche-btn-primary" onclick="mostrarTarjetaReflexionCrisis()">
          Entendido
        </button>
      </div>
    </div>

    <div id="psycheCrisisCard2" class="psyche-crisis-card psyche-crisis-card-reflection" style="display: none; text-align: left;" tabindex="-1">
      <button type="button" class="psyche-crisis-return" onclick="this.closest('.psyche-crisis-overlay').remove()">
        <i data-lucide="arrow-left" aria-hidden="true"></i> Volver al test
      </button>
      <div class="psyche-crisis-reflection-heading">
        <span class="psyche-crisis-icon"><i data-lucide="heart-handshake" aria-hidden="true"></i></span>
        <h2 id="psycheCrisisTitle2">Lo que sientes hoy no tiene que ser para siempre.</h2>
      </div>
      <p class="psyche-crisis-intro">No tienes que sostenerlo todo por tu cuenta. Lo que estás sintiendo merece ser escuchado con cuidado y sin juicios.</p>
      <div class="psyche-crisis-reflection-copy">
        <p>Sabemos que llegar a este punto muchas veces no es solo cuestión de sentir tristeza o miedo, sino de estar profundamente agotado/a de intentar sostenerlo todo por tu cuenta. <strong>Ese cansancio es real y no tienes que justificarlo.</strong></p>
        <p>Cuando el dolor es inmenso, la mente puede hacerte creer que el problema eres tú o que nada va a cambiar. <strong>Esas ideas no son certezas:</strong> pueden aparecer en momentos de mucho sufrimiento. No hay algo malo contigo, y el dolor no define tu valor.</p>
        <p>Aunque hoy el futuro se sienta pesado y oscuro, <strong>mereces un espacio para sanar y un futuro mejor</strong>, aunque ahora mismo te cueste imaginarlo. Con el acompañamiento adecuado, el peso puede aligerarse y es posible volver a experimentar alivio.</p>
        <p>Permitirte recibir apoyo no es rendirse; es darte la oportunidad de dejar de luchar a solas y abrir espacio a una realidad distinta.</p>
      </div>
      <div style="text-align: center; margin-top: 25px;">
        <button class="psyche-btn psyche-btn-primary" onclick="this.closest('.psyche-crisis-overlay').remove()">
          <i data-lucide="heart-handshake" aria-hidden="true"></i> Entendido, deseo continuar el test
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(crisisDiv);
  actualizarIconosTest();
  document.getElementById("psycheCrisisCard1")?.focus();
}

// Función auxiliar para pasar de la Tarjeta 1 a la Tarjeta 2
function mostrarTarjetaReflexionCrisis() {
  const card1 = document.getElementById("psycheCrisisCard1");
  const card2 = document.getElementById("psycheCrisisCard2");
  if (card1 && card2) {
    card1.style.display = "none";
    card2.style.display = "block";
    const crisisOverlay = document.querySelector(".psyche-crisis-overlay");
    if (crisisOverlay) crisisOverlay.setAttribute("aria-labelledby", "psycheCrisisTitle2");
    card2.scrollTop = 0;
  }
}

function renderizarPaso() {
  document.querySelector(".psyche-modal-content")?.classList.remove("is-results");
  actualizarBarraProgreso();
  const container = document.getElementById("psycheTestContainer");
  const bloque = testData[pasoActual];

  if(bloque.type === "welcome") {
    container.innerHTML = bloque.content;
    actualizarIconosTest();
    return;
  }

  let html = `<h2 class="psyche-step-title"><i data-lucide="sparkles" aria-hidden="true"></i>${bloque.title}</h2><p style="margin-bottom: 20px;">${bloque.subtitle || ''}</p>`;

  if(bloque.questions && !bloque.type) {
    bloque.questions.forEach((q, idx) => {
      let valActual = respuestas[q.id] || "";
      let focusClass = idx === 0 ? "active-focus" : "";
      html += `
        <div class="psyche-question-box ${focusClass}" id="q-box-${q.id}">
          <p>${q.text}</p>
          <div class="psyche-options">
            <button class="psyche-opt-btn ${valActual === 'Sí' ? 'selected' : ''}" onclick="seleccionarOpcion('${q.id}', 'Sí', ${q.isCrisis || false}, this)">Sí</button>
            <button class="psyche-opt-btn ${valActual === 'No' ? 'selected' : ''}" onclick="seleccionarOpcion('${q.id}', 'No', false, this)">No</button>
          </div>
        </div>
      `;
    });
  } else if(bloque.type === "checklist") {
    html += `<div class="psyche-checkbox-group">`;
    bloque.options.forEach(opt => {
      let checked = (respuestas[bloque.categoryKey] && respuestas[bloque.categoryKey].includes(opt)) ? "checked" : "";
      html += `
        <label class="psyche-checkbox-label">
          <input type="checkbox" value="${opt}" ${checked} onchange="actualizarChecklist('${bloque.categoryKey}', this)" style="accent-color: #0d5c3f; width: 18px; height: 18px;">
          ${opt}
        </label>
      `;
    });
    html += `</div>`;
  } else if(bloque.type === "context") {
    bloque.questions.forEach(q => {
      let valActual = respuestas[q.id] || "";
      html += `
        <div class="psyche-question-box active-focus">
          <p>${q.text}</p>
          <div class="psyche-options">
            <button class="psyche-opt-btn ${valActual === 'Sí' ? 'selected' : ''}" onclick="seleccionarOpcion('${q.id}', 'Sí', false, this)">Sí</button>
            <button class="psyche-opt-btn ${valActual === 'No' ? 'selected' : ''}" onclick="seleccionarOpcion('${q.id}', 'No', false, this)">No</button>
          </div>
        </div>
      `;
    });
    bloque.checklists.forEach(ch => {
      html += `<p style="font-weight:600; margin-top:20px; margin-bottom:10px; color:#1e293b;">${ch.title}</p><div class="psyche-checkbox-group">`;
      ch.options.forEach(opt => {
        let checked = (respuestas[ch.categoryKey] && respuestas[ch.categoryKey].includes(opt)) ? "checked" : "";
        html += `
          <label class="psyche-checkbox-label">
            <input type="checkbox" value="${opt}" ${checked} onchange="actualizarChecklist('${ch.categoryKey}', this)" style="accent-color: #0d5c3f; width: 18px; height: 18px;">
            ${opt}
          </label>
        `;
      });
      html += `</div>`;
    });
  }

  html += `
    <div class="psyche-nav-buttons">
      <button type="button" class="psyche-nav-back" onclick="pasoAnterior()" aria-label="Volver a la sección anterior" title="Volver">
        <i data-lucide="arrow-left" aria-hidden="true"></i><span>Anterior</span>
      </button>
      <button class="psyche-btn psyche-btn-primary" onclick="siguientePaso()">Siguiente <i data-lucide="arrow-right" aria-hidden="true"></i></button>
    </div>
  `;
  container.innerHTML = html;
  actualizarIconosTest();
}

function actualizarChecklist(categoryKey, input) {
  const group = input.closest(".psyche-checkbox-group");
  if (!group) return;
  const noneOption = "Ninguna de las anteriores";
  const selectedInputs = [...group.querySelectorAll('input[type="checkbox"]:checked')];

  if (input.checked && input.value === noneOption) {
    selectedInputs.forEach(option => {
      if (option !== input) option.checked = false;
    });
  } else if (input.checked) {
    const noneInput = [...group.querySelectorAll('input[type="checkbox"]')].find(option => option.value === noneOption);
    if (noneInput) noneInput.checked = false;
  }

  respuestas[categoryKey] = [...group.querySelectorAll('input[type="checkbox"]:checked')].map(option => option.value);
}

function volverAResultadosAnterior() {
  pasoActual = testData.length - 1;
  renderizarPaso();
  const modalContent = document.querySelector(".psyche-modal-content");
  if (modalContent) modalContent.scrollTop = 0;
}

function etiquetaBreve(texto) {
  return texto.split(" (")[0];
}

function renderizarResultados() {
  const container = document.getElementById("psycheTestContainer");
  const modalContent = document.querySelector(".psyche-modal-content");
  modalContent?.classList.add("is-results");
  const progressLabel = document.getElementById("psycheProgressLabel");
  if (progressLabel) {
    progressLabel.innerHTML = '<span class="psyche-results-label-main">RESULTADOS</span><span class="psyche-results-label-sub">Test de bienestar | Psyche</span>';
  }

  const secciones = testData.filter(bloque => /^Sección (?:[1-9]|1[0-2])$/.test(bloque.title));
  const resultadosSecciones = secciones.map(bloque => {
    let positivos = [];
    if (bloque.questions) {
      positivos = bloque.questions
        .filter(question => respuestas[question.id] === "Sí")
        .map(question => question.symptom || question.text);
    } else if (bloque.type === "checklist") {
      positivos = (respuestas[bloque.categoryKey] || []).filter(item => item !== "Ninguna de las anteriores");
    }
    const total = bloque.questions?.length ??
      bloque.options.filter(option => option !== "Ninguna de las anteriores").length;
    const nombreReporte = bloque.areaName.replace(" (Atención e Hiperactividad)", "");
    return { nombre: bloque.areaName, nombreReporte, titulo: bloque.title, positivos, total };
  }).filter(seccion => seccion.positivos.length > 0);
  const ctx1Positivo = respuestas.ctx1 === "Sí";
  const factores = (respuestas.sintomasSomaticos || [])
    .concat(respuestas.factoresEstres || [])
    .filter(item => item !== "Ninguna de las anteriores")
    .map(etiquetaBreve);
  const totalPositivos = resultadosSecciones.reduce((total, seccion) => total + seccion.positivos.length, 0) +
    factores.length + (ctx1Positivo ? 1 : 0);

  const resumenSecciones = resultadosSecciones.map(seccion => {
    const items = seccion.positivos.map(item => `  - ${item}`).join("\n");
    return `· ${seccion.nombreReporte}: ${seccion.positivos.length}/${seccion.total}\n${items}`;
  }).join("\n\n");
  const resumenCtx1 = `> Iniciativa y Búsqueda de Bienestar: ${ctx1Positivo ? "Sí" : "No"}`;
  const resumenFactores = factores.map(item => `  - ${item}`).join("\n");
  const totalFactores = testData.filter(bloque => bloque.type === "context")
    .flatMap(bloque => bloque.checklists || [])
    .reduce((total, checklist) => total + checklist.options.filter(option => option !== "Ninguna de las anteriores").length, 0);
  const detalleWhatsApp = [
    "¡Hola! He realizado el Test de Bienestar Psyche. Estos son mis resultados:",
    ...(resumenSecciones ? [`\nSÍNTOMAS ENCONTRADOS\n${resumenSecciones}`] : []),
    `\n${resumenCtx1}`,
    ...(factores.length ? [`\nFACTORES GENERALES CLÍNICAMENTE RELEVANTES ENCONTRADOS: ${factores.length}/${totalFactores}\n${resumenFactores}`] : []),
    "\nMe gustaría agendar una sesión psicológica para hablar sobre lo que estoy viviendo y recibir orientación."
  ].join("\n");
  const urlWhatsAppResultados = `https://api.whatsapp.com/send?phone=${WHATSAPP_CLINICA}&text=${encodeURIComponent(detalleWhatsApp)}`;

  const seccionesHtml = resultadosSecciones.map(seccion => `
    <div class="psyche-result-section">
      <p class="psyche-result-section-title"><i data-lucide="circle-dot" aria-hidden="true"></i><strong>${seccion.nombre}</strong></p>
      <ul class="psyche-result-symptoms">${seccion.positivos.map(item => `<li>${item}</li>`).join("")}</ul>
    </div>
  `).join("");
  const factoresHtml = factores.length
    ? `<ul>${factores.map(item => `<li>${item}</li>`).join("")}</ul>`
    : "";
  const ctx1Status = ctx1Positivo
    ? '<span class="psyche-context-status is-positive" role="img" aria-label="Sí" title="Sí"><i data-lucide="circle-check" aria-hidden="true"></i></span>'
    : '<span class="psyche-context-status is-negative" role="img" aria-label="No" title="No"><i data-lucide="circle-x" aria-hidden="true"></i></span>';

  container.innerHTML = `
    <div class="psyche-results-content">
      <img class="psyche-brand-mark" src="logo1.png" alt="Psyche">
      <h2>Panorama de tu bienestar</h2>
      <p>Gracias por completar esta exploración inicial. Las respuestas resumen aspectos que podrían ser importantes para tu bienestar y no constituyen un diagnóstico clínico.</p>
      <p><strong>Se registraron ${totalPositivos} respuestas afirmativas.</strong> Puedes revisar el detalle y compartirlo si lo deseas.</p>

      <div class="psyche-results-cards">
        ${resultadosSecciones.length ? `<section class="psyche-result-card">
          <h3><i data-lucide="clipboard-list" aria-hidden="true"></i> Síntomas encontrados</h3>
          ${seccionesHtml}
        </section>` : ""}
        <section class="psyche-result-card">
          <div class="psyche-context-result"><span class="psyche-context-title"><i data-lucide="heart" aria-hidden="true"></i><strong>Búsqueda de Bienestar</strong></span>${ctx1Status}</div>
        </section>
        ${factores.length ? `<section class="psyche-result-card">
          <h3><i data-lucide="scan-heart" aria-hidden="true"></i> Factores generales clínicamente relevantes encontrados:</h3>
          ${factoresHtml}
        </section>` : ""}
      </div>

      <p class="psyche-disclaimer"><i data-lucide="info" aria-hidden="true"></i><span><strong>Importante:</strong> esta herramienta es orientativa y no reemplaza una evaluación ni un diagnóstico profesional.</span></p>
      <h3 class="psyche-next-title"><i data-lucide="footprints" aria-hidden="true"></i> Próximos pasos</h3>
      <p class="psyche-results-next">Considera conversar sobre lo que estás viviendo con alguien de confianza o con un profesional. Si lo deseas, puedes agendar una sesión para explorar tus resultados.</p>
      <div class="psyche-action-container">
        <a href="${LINK_WHATSAPP_AGENDA}" target="_blank" rel="noopener noreferrer" class="psyche-action-btn psyche-whatsapp-btn">
          <i data-lucide="message-circle" aria-hidden="true"></i> Agendar sesión
        </a>
        <a href="${LINK_CALENDAR}" target="_blank" rel="noopener noreferrer" class="psyche-action-btn psyche-calendar-btn">
          <i data-lucide="calendar-days" aria-hidden="true"></i> Ver horarios disponibles
        </a>
        <a href="${urlWhatsAppResultados}" target="_blank" rel="noopener noreferrer" class="psyche-action-btn psyche-whatsapp-share-btn psyche-action-btn-share">
          <i data-lucide="share-2" aria-hidden="true"></i> Compartir resultados por WhatsApp
        </a>
      </div>
      <div class="psyche-nav-buttons psyche-results-controls">
        <button type="button" class="psyche-nav-back" onclick="volverAResultadosAnterior()" aria-label="Volver y modificar respuestas" title="Volver y modificar respuestas">
          <i data-lucide="arrow-left" aria-hidden="true"></i>
        </button>
        <button type="button" class="psyche-reset-link" onclick="reiniciarTest()" aria-label="Reiniciar test">
          <i data-lucide="rotate-ccw" aria-hidden="true"></i><span>Reiniciar</span>
        </button>
      </div>
    </div>
  `;
  actualizarIconosTest();
}