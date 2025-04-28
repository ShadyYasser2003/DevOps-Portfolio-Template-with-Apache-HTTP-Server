let sections = document.querySelectorAll('header navbar nav-item');
let navLinks = document.querySelectorAll('header navbar nav-item a');
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove('active');
        document
          .querySelector('header navbar nav-item a [href*=' + id + ']')
          .classList.add('active');
      });
    }
  });
};
