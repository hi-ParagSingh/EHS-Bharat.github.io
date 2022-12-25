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
      url: "assets/img/ergonomics.png",
      description:
        "Ergonomics is designing a job to fit the worker so the work is safer and more efficient. Implementing ergonomic solutions can make employees more comfortable and increase productivity.",
    },
    {
      title: "Fire safety",
      type: "fire_safety",
      url: "assets/img/Fire-safety-at-public-places.jpg",
      description:
        "Active fire protection is an integral part of fire protection. AFP is characterized by items and/or systems, which require a certain amount of motion and response in order to work, contrary to passive fire protection.",
    },
    {
      title: "Workplace violence prevention",
      type: "violence_prevention",
      url: "assets/img/istockphoto-1068535750-612x612.jpg",
      description:
        "To reduce the possibility of workplace violence, companies must identify risk factors in their workplace and the way their workers operate, take necessary steps to limit those risks,& should build an extraordinary team culture. And we are not just talking about dangerous instances like shooting.",
    },
    {
      title: "Employee health resources",
      type: "health_resources",
      url: "assets/img/Texas_Health_Resources_Companies_Care.jpg",
      description:
        "Employee health encompasses the physical and mental status of your employees. It can cover illness and wellness in the same breath. When we talk about health, physical health comes into mind first, but mental health is just as important. And bad physical health can lead to bad mental health and vice versa.",
    },
    {
      title: "Environmental safety",
      type: "environmental_safety",
      url: "assets/img/Safety and Environmental Management.png",
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
      title: "Online safety and cyber security",
      type: "cyber_security",
      url: "assets/img/online_safety.webp",
      description:
        "While cybersecurity protects devices and networks from harm by third parties, Online Safety protects the people using them from harm by the devices and networks (and therefore third parties) through awareness, education, information and technology.",
    },
    {
      title: "Electrical safety",
      type: "electrical_safety",
      url: "assets/img/workplace-electrical-safety.jpg",
      description:
        "Electrical safety is a system of organizational measures and technical means to prevent harmful and dangerous effects on workers from electric current, arcing, electromagnetic fields and static electricity.",
    },
    {
      title: "Hazard Communication Standards",
      type: "communication_standards",
      url: "assets/img/hazard.jpg",
      description:
        "The Hazard Communication Standard requires employers in the United States to disclose toxic and hazardous substances in workplaces. This is related to the Worker Protection Standard.",
    },
    {
      title: "Machinery and Equipment Safety Machine guarding",
      type: "machine_safety",
      url: "assets/img/machine_guards.jpg",
      description:
        "Machine guarding is a safety feature on or around manufacturing or other engineering equipment consisting of a shield or device covering hazardous areas of a machine to prevent contact with body parts or to control hazards like chips or sparks from exiting the machine.",
    },
    {
      title: "Chemical hazard substance",
      type: "hazard_substance",
      url: "assets/img/istockphoto-157529625-612x612.jpg",
      description:
        "A chemical hazard is a substance that has the potential to cause harm to life or health. Chemicals are widely used in the home and in many other places. Exposure to chemicals can cause acute or long-term detrimental health effects.",
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
      url: "assets/img/Construction.jpeg",
      description:
        "Construction site safety is an aspect of construction-related activities concerned with protecting construction site workers and others from death, injury, disease or other health-related risks.",
    },
    {
      title: "Radiation safety",
      type: "radiation_safety",
      url: "assets/img/istockphoto-692567132-612x612.jpg",
      description:
        "The guiding principle of radiation safety is “ALARA”. ALARA stands for “as low as reasonably achievable”. This principle means that even if it is a small dose, if receiving that dose has no direct benefit, you should try to avoid it.",
    },
    {
      title: "Driver Safety",
      type: "driver_safety",
      url: "assets/img/driver.jpg",
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
      title: "Hazard Communication",
      type: "hazard_communication",
      url: "assets/img/images.jpeg",
      description:
        "The Hazard Communication Standard requires employers in the United States to disclose toxic and hazardous substances in workplaces. This is related to the Worker Protection Standard.",
    },
    {
      title: "Mining Safety",
      type: "mining_safety",
      url: "assets/img/Safety-in-Mining.jpg",
      description:
        "Mine safety is a broad term referring to the practice of controlling and managing a wide range of hazards associated with the life cycle of mining-related activities.",
    },
    {
      title: "Incident Investigation and Reporting",
      type: "investigation_reporting",
      url: "assets/img/Accident-Reporting-Investigation-Construction-Site.jpg",
      description:
        "Incident investigation is a process for reporting, tracking, and investigating incidents that includes a formal process for investigating incidents, including staffing, performing, documenting, and tracking investigations of process safety incidents and the trending of incident and incident investigation data to identify recurring incidents. ",
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
