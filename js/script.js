function initBurger(
   burgerButton,
   burgerMenu,
   closingOut,
   escapeClose,
   activeClass,
   classTarget
) {
   const BUTTON = document.querySelector(`.${burgerButton}`);
   const MENU = document.querySelector(`.${burgerMenu}`);
   const CLASS = activeClass ? activeClass : `burger-opened`;
   const TARGET = ((status) => {
      switch (status) {
         case "menu":
            return MENU;
         case "button":
            return BUTTON;
         case "both":
            return [MENU, BUTTON];
         case "all":
            return [MENU, BUTTON, document.documentElement];
         default:
            return document.documentElement;
      }
   })(classTarget);

   console.log(TARGET);

   document.addEventListener("click", burgerClicks);
   if (escapeClose) {
      document.addEventListener("keydown", burgerKey);
   }

   function burgerOpen() {
      if (Array.isArray(TARGET)) {
         TARGET.forEach((x) => x.classList.add(CLASS));
      } else {
         TARGET.classList.add(CLASS);
      }
   }
   function burgerClose() {
      if (Array.isArray(TARGET)) {
         TARGET.forEach((x) => x.classList.remove(CLASS));
      } else {
         TARGET.classList.remove(CLASS);
      }
   }

   function takeBurgerState() {
      return document.documentElement.classList.contains(CLASS)
         ? true
         : false;
   }

   function burgerClicks(event) {
      if (takeBurgerState()) {
         if (
            (event.target != MENU &&
               !MENU.contains(event.target) &&
               closingOut) ||
            event.target == BUTTON
         ) {
            burgerClose();
         }
      } else {
         if (event.target == BUTTON) {
            burgerOpen();
         }
      }
   }

   function burgerKey(event) {
      if (event.code.toLowerCase() === "escape") {
         burgerClose();
      }
   }
}
initBurger(`burger-button`, `burger`, true, true, `active-burger`, `burger-button`);

function initScroll(
   scrollButton,
   pxToShow,
   fadeOutOnFooter,
   scrollActiveClass,
   isSmooth
) {
   const CLASS = scrollActiveClass ? scrollActiveClass : "show";
   const BUTTON = !document.querySelector(`.${scrollButton}`)
      ? document.querySelector(`[data-${scrollButton}]`)
      : document.querySelector(`.${scrollButton}`);
   BUTTON.onclick = () => {
      BUTTON.classList.remove(CLASS);
      window.scrollTo({
         top: 0,
         left: 0,
         behavior: isSmooth ? "smooth" : "auto",
      });
   };
   window.onscroll = () => {
      if (document.pageYOffset >= pxToShow) {
         BUTTON.classList.add('CLASS');
      } else {
         BUTTON.classList.remove('CLASS');
      }
   };
}

initScroll("scroll", 0, false, false, true);