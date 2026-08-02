const mapModal = document.querySelector(".open-imgs");
const regisImgs = document.querySelectorAll(".regis-imgs > img");
const regcloseImgs = document.querySelector(".close-imgs");
const regopenImgs = document.querySelector(".open-imgs > img");
const closeModal = document.querySelector('.closetag');

// Only run if the modal elements exist on this page
if (mapModal && regcloseImgs && regopenImgs && closeModal) {
  regisImgs.forEach((image, index) => {
    image.addEventListener("click", (n) => {
      mapModal.classList.toggle("active");
      regopenImgs.src = n.target.src;
    });
  });

  regcloseImgs.addEventListener("click", () => {
    mapModal.classList.remove("active");
  });

  closeModal.addEventListener('click', () => {
    mapModal.classList.remove('active');
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      mapModal.classList.remove("active");
    }
  });
}