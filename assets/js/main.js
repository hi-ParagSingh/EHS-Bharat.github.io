(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Clients Slider
   */
  new Swiper(".clients-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120,
      },
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  let servies_data = [
    {
      title: "Workplace ergonomics",
      type: "workplace_ergonomics",
      url: "assets/img/ergonomics.JPG",
      description:
        "Ergonomics is designing a job to fit the worker so the work is safer and more efficient. Implementing ergonomic solutions can make employees more comfortable and increase productivity.",
    },
    {
      title: "Fire safety",
      type: "fire_safety",
      url: "assets/img/fire_safety.png",
      description:
        "Active fire protection is an integral part of fire protection. AFP is characterized by items and/or systems, which require a certain amount of motion and response in order to work, contrary to passive fire protection.",
    },

    {
      title: "Employee health resources",
      type: "health_resources",
      url: "assets/img/employee_health.jpg",
      description:
        "Employee health encompasses the physical and mental status of your employees. It can cover illness and wellness in the same breath. When we talk about health, physical health comes into mind first, but mental health is just as important. And bad physical health can lead to bad mental health and vice versa.",
    },
    {
      title: "Environmental safety",
      type: "environmental_safety",
      url: "assets/img/environmental.jpg",
      description:
        "Environment, health and safety, EHS is an acronym for the set that studies and implements the practical aspects of protecting the environment and maintaining health and safety at occupation. In simple terms it is what organizations must do to make sure that their activities do not cause harm to anyone.",
    },
    {
      title: "Equipment safety",
      type: "equipment_safety",
      url: "assets/img/equipment.jpg",
      description:
        "Safety equipment, also known as personal protective equipment, is specifically designed to help protect workers against health or safety risks on the jobsite. By wearing the appropriate safety equipment, workers can decrease the number of preventable accidents that occur on jobsites every year.",
    },
    {
      title: "Work at height safety",
      type: "height_safety",
      url: "assets/img/height_safety.jpg",
      description:
        "Working at height remains one of the biggest causes of fatalities and major injuries. Common cases include falls from roofs, ladders, and through fragile surfaces. ‘Work at height’ means work in any place where, if there were no precautions in place, a person could fall a distance liable to cause personal injury (for example a fall through a fragile roof down an unprotected lift shaft, stairwells).",
    },
    {
      title: "Electrical safety",
      type: "electrical_safety",
      url: "assets/img/electrical.jpg",
      description:
        "Electrical safety is a system of organizational measures and technical means to prevent harmful and dangerous effects on workers from electric current, arcing, electromagnetic fields and static electricity.",
    },
    {
      title: "Excavation safety",
      type: "excavation_safety",
      url: "assets/img/excavation.jpg",
      description:
        "Excavation Safety is a standardized set of safety precautions for trenching and excavation to eliminate hazards and control risks in compliance with regulations. It is also referred to as Trenching and Excavation Safety as often cited by the U.S. Occupational Safety and Health Administration (OSHA).",
    },
    {
      title: "Machinery and Equipment Safety Machine guarding",
      type: "machine_safety",
      url: "assets/img/machine_guards.jpg",
      description:
        "Machine guarding is a safety feature on or around manufacturing or other engineering equipment consisting of a shield or device covering hazardous areas of a machine to prevent contact with body parts or to control hazards like chips or sparks from exiting the machine.",
    },
    {
      title: "Scaffolding",
      type: "scaffolding",
      url: "assets/img/scaffolding-components.jpg",
      description:
        "Scaffolding, also called scaffold or staging, is a temporary structure used to support a work crew and materials to aid in the construction, maintenance and repair of buildings, bridges and all other man-made structures.",
    },
    {
      title: "Chemical safety",
      type: "chemical_safety",
      url: "assets/img/Origami-Risk.jpg",
      description:
        "Chemicals as elements, compounds, mixtures, solutions and emulsions are very widely used and transported in the modern industrial society. ",
    },
    {
      title: "Construction site safety",
      type: "construction_safety",
      url: "assets/img/construction_safety.webp",
      description:
        "Construction site safety is an aspect of construction-related activities concerned with protecting construction site workers and others from death, injury, disease or other health-related risks.",
    },
    {
      title: "Driver Safety",
      type: "driver_safety",
      url: "assets/img/driver.webp",
      description:
        "As people age, changes occur in their mental and physical condition that may affect their ability to assess traffic situations and respond to them rapidly and appropriately. Having driven for many years, older individuals may not recognize these changes or the increased risk of accident associated with them. Driver safety assesses the ability of a driver, regardless of age, to control a vehicle and respond appropriately to changing traffic conditions.",
    },
    {
      title: "Hazardous Waste Operations and Emergency Response (HAZWOPER)",
      type: "hazwoper",
      url: "assets/img/03102022_HAZWOPER_Banner.jpg",
      description:
        "HAZWOPER is the one of the most prominent international standards that governs health and safety work environments related to hazardous elements. Coined by OSHA, HAZWOPERM has been formulated as a regulatory standard which intends to protect employees working at sites of unprotected and uncontrolled hazardous wastes, performing clean-up operations of hazardous wastes without protective gears, engaged in waste treatment, storage and disposal plants and involved in emergency response activities related to hazardous items.",
    },
    {
      title: "Incident Investigation and Reporting",
      type: "investigation_reporting",
      url: "assets/img/Accident-Reporting-Investigation-Construction-Site.jpg",
      description:
        "Incident investigation is a process for reporting, tracking, and investigating incidents that includes a formal process for investigating incidents, including staffing, performing, documenting, and tracking investigations of process safety incidents and the trending of incident and incident investigation data to identify recurring incidents. ",
    },
    {
      title: "Mock Drills (Evacuation)",
      type: "mock_drills",
      url: "assets/img/evacuation_mock.jpg",
      description:
        "A “mock drill” is a scenario in which participants practise how they would react in the event of a disaster or emergency. For the sake of safety, mock drills are held in schools, colleges, hospitals, apartments, industries, and organisations around the world. Mock drills are a sort of training exercise that is used to assess an organization’s readiness and identify problem areas. ",
    },
    {
      title: "First aid trainings",
      type: "first_aid",
      url: "assets/img/first_aid.jpg",
      description:
        "It includes initial intervention in a serious condition prior to professional medical help being available, such as performing cardiopulmonary resuscitation (CPR) while waiting for an ambulance, as well as the complete treatment of minor conditions, such as applying a plaster to a cut.",
    },
    {
      title: "Airport Process safety",
      type: "airport_process",
      url: "assets/img/airport.webp",
      description:
        "Airport security includes the techniques and methods used in an attempt to protect passengers, staff, aircraft, and airport property from malicious harm, crime, terrorism, and other threats.",
    },
  ];

  const services_container = document.querySelector("#services_container");
  if (services_container) {
    servies_data.forEach((e) => {
      let div = document.createElement("div");
      div.className = "col-lg-4 col-md-6 portfolio-item filter-app";
      div.innerHTML = `<div class="portfolio-wrap">
        <img src="${e.url}" class="img-fluid" alt="" />
        <div class="portfolio-links">
          <a href="details.html?${encodeURIComponent(
            e.type
          )}" title="More Details">
            <i class="bi bi-link"></i>
          </a>
        </div>
        <div class="portfolio-info">
          <h4>${e.title}</h4>
        </div>
      </div>`;
      services_container.appendChild(div);
    });
  }
})();
