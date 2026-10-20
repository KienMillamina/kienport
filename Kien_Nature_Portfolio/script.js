const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// ---------------------------------------------------------
// MOBILE NAVIGATION
// ---------------------------------------------------------
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');

    menuToggle.classList.toggle('open', isOpen);

    menuToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    document.body.style.overflow =
      isOpen ? 'hidden' : '';
  });

  document
    .querySelectorAll('#mainNav a')
    .forEach(function (link) {

      link.addEventListener('click', function () {

        mainNav.classList.remove('open');

        menuToggle.classList.remove('open');

        menuToggle.setAttribute(
          'aria-expanded',
          'false'
        );

        document.body.style.overflow = '';

      });

    });
}


// ---------------------------------------------------------
// REVEAL ELEMENTS AS THEY ENTER THE VIEWPORT
// ---------------------------------------------------------

const revealItems =
  document.querySelectorAll('.reveal');


if ('IntersectionObserver' in window) {

  const revealObserver =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'is-visible'
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.15
      }
    );


  revealItems.forEach(function (item) {

    revealObserver.observe(item);

  });

} else {

  revealItems.forEach(function (item) {

    item.classList.add('is-visible');

  });

}


// ---------------------------------------------------------
// CURRENT YEAR
// ---------------------------------------------------------

const year =
  document.getElementById('year');


if (year) {

  year.textContent =
    new Date().getFullYear();

}


// ---------------------------------------------------------
// SOFT PORTRAIT PARALLAX
// ---------------------------------------------------------

const portraitFrame =
  document.querySelector(
    '.portrait-frame'
  );


window.addEventListener(
  'mousemove',
  function (event) {

    if (
      !portraitFrame ||
      window.innerWidth < 900
    ) {
      return;
    }


    const x =
      (
        event.clientX /
        window.innerWidth -
        0.5
      ) * 8;


    const y =
      (
        event.clientY /
        window.innerHeight -
        0.5
      ) * 8;


    portraitFrame.style.transform =
      'rotate(' +
      (-3 + x * 0.12) +
      'deg) translate(' +
      (x * 0.4) +
      'px, ' +
      (y * 0.4) +
      'px)';

  }
);


// ---------------------------------------------------------
// OLIVE CURSOR AURA
// ---------------------------------------------------------

const finePointer =
  window.matchMedia(
    '(pointer: fine)'
  ).matches;


const reducedMotion =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;


let aura = null;
let dot = null;


if (
  finePointer &&
  !reducedMotion
) {

  aura =
    document.createElement('div');

  dot =
    document.createElement('div');


  aura.className =
    'cursor-aura';

  dot.className =
    'cursor-dot';


  document.body.appendChild(aura);

  document.body.appendChild(dot);


  let mouseX =
    window.innerWidth / 2;

  let mouseY =
    window.innerHeight / 2;

  let auraX =
    mouseX;

  let auraY =
    mouseY;


  document.addEventListener(
    'mousemove',
    function (event) {

      mouseX =
        event.clientX;

      mouseY =
        event.clientY;


      dot.style.transform =
        'translate3d(' +
        mouseX +
        'px,' +
        mouseY +
        'px,0)';


      aura.classList.add(
        'visible'
      );

      dot.classList.add(
        'visible'
      );

    }
  );


  document.addEventListener(
    'mouseleave',
    function () {

      aura.classList.remove(
        'visible'
      );

      dot.classList.remove(
        'visible'
      );

    }
  );


  function animateAura() {

    auraX +=
      (mouseX - auraX) *
      0.14;


    auraY +=
      (mouseY - auraY) *
      0.14;


    aura.style.transform =
      'translate3d(' +
      auraX +
      'px,' +
      auraY +
      'px,0)';


    requestAnimationFrame(
      animateAura
    );

  }


  animateAura();


  const hoverTargets =
    document.querySelectorAll(
      'a, button, .portrait-frame, .project-entry, .rings, .hobby-chips button'
    );


  hoverTargets.forEach(
    function (target) {

      target.addEventListener(
        'mouseenter',
        function () {

          aura.classList.add(
            'is-hovering'
          );

          dot.classList.add(
            'is-hovering'
          );

        }
      );


      target.addEventListener(
        'mouseleave',
        function () {

          aura.classList.remove(
            'is-hovering'
          );

          dot.classList.remove(
            'is-hovering'
          );

        }
      );

    }
  );

}


// ---------------------------------------------------------
// SMALL CLICK RIPPLE
// ---------------------------------------------------------

if (!reducedMotion) {

  document.addEventListener(
    'pointerdown',
    function (event) {

      if (
        event.button !== 0
      ) {
        return;
      }


      const ripple =
        document.createElement(
          'span'
        );


      ripple.className =
        'seed-ripple';


      ripple.style.left =
        event.clientX +
        'px';


      ripple.style.top =
        event.clientY +
        'px';


      document.body.appendChild(
        ripple
      );


      window.setTimeout(
        function () {

          ripple.remove();

        },
        750
      );

    }
  );

}


// ---------------------------------------------------------
// CLICKABLE PORTRAIT + BOTANICAL LIGHTBOX
// ---------------------------------------------------------

const portraitTrigger =
  document.getElementById(
    'portraitTrigger'
  );


let profileLightbox = null;

let lastFocusedElement = null;


function buildProfileLightbox() {

  const overlay =
    document.createElement(
      'div'
    );


  overlay.className =
    'profile-lightbox';


  overlay.setAttribute(
    'role',
    'dialog'
  );


  overlay.setAttribute(
    'aria-modal',
    'true'
  );


  overlay.setAttribute(
    'aria-label',
    'About Kien Millamina'
  );


  overlay.innerHTML =
    '<div class="profile-lightbox-card">' +

      '<img class="profile-lightbox-photo" src="download.jpg" alt="Kien Leandro M. Millamina">' +

      '<div class="profile-lightbox-copy">' +

        '<button class="profile-lightbox-close" type="button" aria-label="Close profile">×</button>' +

        '<p class="kicker">PERSONAL SPECIMEN / KM</p>' +

        '<h3>Kien Leandro<br>M. Millamina</h3>' +

        '<p>' +
        'I’m a Computer Science student who likes learning by doing. ' +
        'My portfolio mixes class exercises with the things I care about outside school: ' +
        'routines, rest, food, and steady improvement.' +
        '</p>' +

        '<div class="profile-lightbox-facts">' +

          '<span>BS Computer Science</span>' +

          '<span>Gym · Eat · Sleep</span>' +

          '<span>Build · Test · Refine</span>' +

        '</div>' +

      '</div>' +

    '</div>';


  document.body.appendChild(
    overlay
  );


  return overlay;

}


function openProfileLightbox() {

  if (!profileLightbox) {

    profileLightbox =
      buildProfileLightbox();


    const closeButton =
      profileLightbox.querySelector(
        '.profile-lightbox-close'
      );


    closeButton.addEventListener(
      'click',
      closeProfileLightbox
    );


    profileLightbox.addEventListener(
      'click',
      function (event) {

        if (
          event.target ===
          profileLightbox
        ) {

          closeProfileLightbox();

        }

      }
    );

  }


  lastFocusedElement =
    document.activeElement;


  profileLightbox.classList.add(
    'open'
  );


  document.body.style.overflow =
    'hidden';


  const closeButton =
    profileLightbox.querySelector(
      '.profile-lightbox-close'
    );


  window.setTimeout(
    function () {

      closeButton.focus();

    },
    50
  );

}


function closeProfileLightbox() {

  if (!profileLightbox) {
    return;
  }


  profileLightbox.classList.remove(
    'open'
  );


  document.body.style.overflow =
    '';


  if (
    lastFocusedElement &&
    typeof lastFocusedElement.focus ===
      'function'
  ) {

    lastFocusedElement.focus();

  }

}


if (portraitTrigger) {

  portraitTrigger.addEventListener(
    'click',
    openProfileLightbox
  );


  portraitTrigger.addEventListener(
    'keydown',
    function (event) {

      if (
        event.key === 'Enter' ||
        event.key === ' '
      ) {

        event.preventDefault();

        openProfileLightbox();

      }

    }
  );

}


document.addEventListener(
  'keydown',
  function (event) {

    if (
      event.key === 'Escape' &&
      profileLightbox &&
      profileLightbox.classList.contains(
        'open'
      )
    ) {

      closeProfileLightbox();

    }

  }
);


// ---------------------------------------------------------
// CLICKABLE HOBBY FIELD NOTES
// ---------------------------------------------------------

const hobbyButtons =
  document.querySelectorAll(
    '.hobby-chips button'
  );


const hobbyMessage =
  document.getElementById(
    'hobbyMessage'
  );


hobbyButtons.forEach(
  function (button) {

    button.addEventListener(
      'click',
      function () {

        hobbyButtons.forEach(
          function (item) {

            item.classList.remove(
              'active'
            );

          }
        );


        button.classList.add(
          'active'
        );


        if (!hobbyMessage) {
          return;
        }


        hobbyMessage.classList.add(
          'switching'
        );


        window.setTimeout(
          function () {

            hobbyMessage.textContent =
              button.getAttribute(
                'data-hobby-message'
              );


            hobbyMessage.classList.remove(
              'switching'
            );

          },
          170
        );

      }
    );

  }
);


// ---------------------------------------------------------
// MAGNETIC BUTTONS
// ---------------------------------------------------------

const magneticTargets =
  document.querySelectorAll(
    '.button, .text-link'
  );


if (
  finePointer &&
  !reducedMotion
) {

  magneticTargets.forEach(
    function (target) {

      target.classList.add(
        'magnetic'
      );


      target.addEventListener(
        'mousemove',
        function (event) {

          const rect =
            target.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left -
            rect.width / 2;


          const y =
            event.clientY -
            rect.top -
            rect.height / 2;


          target.style.setProperty(
            '--mag-x',
            (x * 0.10) +
            'px'
          );


          target.style.setProperty(
            '--mag-y',
            (y * 0.12) +
            'px'
          );

        }
      );


      target.addEventListener(
        'mouseleave',
        function () {

          target.style.setProperty(
            '--mag-x',
            '0px'
          );


          target.style.setProperty(
            '--mag-y',
            '0px'
          );

        }
      );

    }
  );

}


// ---------------------------------------------------------
// PROJECT ROW POINTER TILT
// ---------------------------------------------------------

const projectEntries =
  document.querySelectorAll(
    '.project-entry'
  );


if (
  finePointer &&
  !reducedMotion
) {

  projectEntries.forEach(
    function (entry) {

      entry.addEventListener(
        'mousemove',
        function (event) {

          const rect =
            entry.getBoundingClientRect();


          const px =
            (
              event.clientX -
              rect.left
            ) /
            rect.width -
            0.5;


          const py =
            (
              event.clientY -
              rect.top
            ) /
            rect.height -
            0.5;


          const rotateY =
            px * 1.8;


          const rotateX =
            py * -1.2;


          entry.classList.add(
            'pointer-active'
          );


          entry.style.transform =
            'perspective(1000px) ' +
            'rotateX(' +
            rotateX +
            'deg) ' +
            'rotateY(' +
            rotateY +
            'deg)';

        }
      );


      entry.addEventListener(
        'mouseleave',
        function () {

          entry.classList.remove(
            'pointer-active'
          );


          entry.style.transform =
            '';

        }
      );

    }
  );

}


// ---------------------------------------------------------
// INTERACTIVE GROWTH RINGS
// HTML = OUTERMOST / STRONGEST
// JAVASCRIPT = SECOND
// CSS = THIRD
// JQUERY = INNERMOST
// ---------------------------------------------------------

const ringsArea =
  document.querySelector(
    '.rings'
  );


if (ringsArea) {

  const ringMap = [

    {
      ring:
        ringsArea.querySelector(
          '.ring-html'
        ),

      label:
        ringsArea.querySelector(
          '.label-html'
        ),

      radius: 0.47
    },

    {
      ring:
        ringsArea.querySelector(
          '.ring-js'
        ),

      label:
        ringsArea.querySelector(
          '.label-js'
        ),

      radius: 0.34
    },

    {
      ring:
        ringsArea.querySelector(
          '.ring-css'
        ),

      label:
        ringsArea.querySelector(
          '.label-css'
        ),

      radius: 0.21
    },

    {
      ring:
        ringsArea.querySelector(
          '.ring-jquery'
        ),

      label:
        ringsArea.querySelector(
          '.label-jquery'
        ),

      radius: 0.08
    }

  ];


  function clearRingHighlights() {

    ringMap.forEach(
      function (item) {

        if (item.ring) {

          item.ring.classList.remove(
            'is-active'
          );

        }


        if (item.label) {

          item.label.classList.remove(
            'is-active'
          );

        }

      }
    );

  }


  ringsArea.addEventListener(
    'mousemove',
    function (event) {

      const rect =
        ringsArea.getBoundingClientRect();


      const centerX =
        rect.left +
        rect.width / 2;


      const centerY =
        rect.top +
        rect.height / 2;


      const dx =
        event.clientX -
        centerX;


      const dy =
        event.clientY -
        centerY;


      const distance =
        Math.sqrt(
          dx * dx +
          dy * dy
        );


      const normalized =
        distance /
        rect.width;


      let closest = null;

      let smallestDifference =
        Infinity;


      ringMap.forEach(
        function (item) {

          const difference =
            Math.abs(
              normalized -
              item.radius
            );


          if (
            difference <
            smallestDifference
          ) {

            smallestDifference =
              difference;


            closest =
              item;

          }

        }
      );


      clearRingHighlights();


      if (closest) {

        if (closest.ring) {

          closest.ring.classList.add(
            'is-active'
          );

        }


        if (closest.label) {

          closest.label.classList.add(
            'is-active'
          );

        }

      }


      if (
        finePointer &&
        !reducedMotion
      ) {

        const moveX =
          (
            event.clientX -
            centerX
          ) *
          0.012;


        const moveY =
          (
            event.clientY -
            centerY
          ) *
          0.012;


        ringsArea.style.transform =
          'translate(' +
          moveX +
          'px,' +
          moveY +
          'px)';

      }

    }
  );


  ringsArea.addEventListener(
    'mouseleave',
    function () {

      clearRingHighlights();

      ringsArea.style.transform =
        '';

    }
  );

}


// ---------------------------------------------------------
// ACTIVE NAVIGATION + SCROLL VINE
// ---------------------------------------------------------

const sections =
  document.querySelectorAll(
    'main section[id]'
  );


const navLinks =
  document.querySelectorAll(
    '.main-nav a[href^="#"]'
  );


const vine =
  document.createElement(
    'div'
  );


vine.className =
  'scroll-vine';


vine.setAttribute(
  'aria-hidden',
  'true'
);


vine.innerHTML =
  '<span class="scroll-vine-track"></span>' +
  '<span class="scroll-vine-leaf"></span>';


document.body.appendChild(
  vine
);


const vineLeaf =
  vine.querySelector(
    '.scroll-vine-leaf'
  );


function updateScrollDetails() {

  const scrollTop =
    window.scrollY ||
    document.documentElement.scrollTop;


  const maxScroll =
    document.documentElement.scrollHeight -
    window.innerHeight;


  const progress =
    maxScroll > 0
      ? Math.min(
          1,
          scrollTop /
          maxScroll
        )
      : 0;


  if (vineLeaf) {

    vineLeaf.style.top =
      'calc(' +
      (progress * 100) +
      '% - ' +
      (progress * 18) +
      'px)';

  }


  let currentId = '';


  sections.forEach(
    function (section) {

      const top =
        section.offsetTop -
        180;


      if (
        scrollTop >= top
      ) {

        currentId =
          section.id;

      }

    }
  );


  navLinks.forEach(
    function (link) {

      link.classList.toggle(
        'active',
        link.getAttribute(
          'href'
        ) ===
        '#' +
        currentId
      );

    }
  );

}


window.addEventListener(
  'scroll',
  updateScrollDetails,
  {
    passive: true
  }
);


updateScrollDetails();