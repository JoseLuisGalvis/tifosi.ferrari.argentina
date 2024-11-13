// Cierre del Menu Hamburguesa
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.querySelector("#navbarNav"); // Correcto: ID del contenedor de navegación
  const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
    toggle: false,
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Cierra el menú al hacer clic en cualquier enlace
      bsCollapse.hide();

      // Obtiene el id del destino desde el href
      const targetId = link.getAttribute("href");

      // Espera a que el menú se cierre y luego hace scroll suave al destino
      setTimeout(() => {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 250); // Ajusta el tiempo si es necesario
    });
  });
});

// Modo Oscuro

document.addEventListener("DOMContentLoaded", function () {
  const darkModeBtn = document.getElementById("darkModeBtn");
  const body = document.body;

  // Comprobar el estado almacenado en localStorage y aplicar el modo oscuro si está habilitado
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode"); // Asegurar que el modo claro esté activo por defecto
  }

  // Evento para cambiar el tema
  darkModeBtn.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    // Almacenar el estado del modo en localStorage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });
});

// Animación GSAP con ScrollTrigger

// Registrar el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Configuración unificada para todas las animaciones
const config = {
  mobile: {
    firstAnimation: {
      top: "212vh",
      left: "38vw",
    },
    secondAnimation: {
      top: "341vh",
      left: "10vw",
    },
  },
  desktop: {
    firstAnimation: {
      top: "162vh",
      left: "5vw",
    },
    secondAnimation: {
      top: "260vh",
      left: "40vw",
    },
  },
};

// Función para crear/actualizar la primera animación
function createFirstAnimation() {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const { top: topValue, left: leftValue } = isMobile
    ? config.mobile.firstAnimation
    : config.desktop.firstAnimation;

  if (window.firstAnimation) {
    window.firstAnimation.kill();
    window.firstAnimation.scrollTrigger?.kill();
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#section-2",
      start: "top top",
      end: "bottom top",
      scrub: true,
      markers: false,
    },
  });

  tl.to(
    "#auto",
    {
      top: topValue,
      left: leftValue,
      duration: 5,
    },
    "start"
  );

  window.firstAnimation = tl;
}

// Función para crear/actualizar la segunda animación
function createSecondAnimation() {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const { top: topValue, left: leftValue } = isMobile
    ? config.mobile.secondAnimation
    : config.desktop.secondAnimation;

  if (window.secondAnimation) {
    window.secondAnimation.kill();
    window.secondAnimation.scrollTrigger?.kill();
  }

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#section-3",
      start: "top top",
      end: "bottom top",
      scrub: true,
      markers: false,
    },
  });

  tl2.to(
    "#auto",
    {
      top: topValue,
      left: leftValue,
      duration: 1,
    },
    "start"
  );

  window.secondAnimation = tl2;
}

// Función para actualizar todas las animaciones
function updateAllAnimations() {
  createFirstAnimation();
  createSecondAnimation();
}

// Inicializar las animaciones
updateAllAnimations();

// Actualizar todas las animaciones cuando cambie el tamaño de la ventana
window.addEventListener("resize", gsap.debounce(updateAllAnimations, 250));
