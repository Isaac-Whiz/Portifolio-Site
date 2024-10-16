class Index {
  constructor() {
    this.hero = document.querySelector(".hero");
    this.quantity = 50;
    this.ceiling = 100;
    this.mbdImage = document.getElementById("animationDemo");
    this.objects = document.querySelectorAll(".slide-in-object");
    this.imageWrapper = document.querySelectorAll(".image-wrapper");
    this.imageBorder = document.querySelector(".image-border");
    this.txtName = document.getElementById("name");
    this.txtEmail = document.getElementById("email");
    this.txtMessage = document.getElementById("message");
    this.btnSend = document.getElementById("btnSend");
    this.toastEl = document.getElementById("liveToast");

    this.#init();
  }

  #init() {
    this.#loadFlies();
    this.#loadSlideInAnimation();
    this.#animateImages();
    this.#animateAlbum();
    this.#addLinksEventListener();
    this.#sendMessage();
  }

  #loadFlies() {
    document.addEventListener("DOMContentLoaded", () => {
      for (let i = 1; i <= this.quantity; i++) {
        const firefly = this.#createFirefly(i);
        this.hero.appendChild(firefly);
        this.#animateFirefly(firefly);
      }
    });
  }

  #addLinksEventListener() {
    const threshold = 0.1;
    document.addEventListener("DOMContentLoaded", function () {
      const divisions = document.querySelectorAll("div[id]");
      const links = document.querySelectorAll(".navbar-nav .nav-link");
      const removeActiveClass = () => {
        links.forEach((link) => link.classList.remove("active"));
      };

      const addActiveClass = (id) => {
        removeActiveClass();
        const currentNavLink = document.querySelector(
          `.navbar-nav .nav-link[href="#${id}"]`
        );
        if (currentNavLink) {
          currentNavLink.classList.add("active");
        }
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.getAttribute("id");
              addActiveClass(sectionId);
            }
          });
        },
        {
          threshold: threshold,
        }
      );
      divisions.forEach((section) => observer.observe(section));
    });
  }

  #loadSlideInAnimation() {
    document.addEventListener("DOMContentLoaded", () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      this.objects.forEach((object) => {
        observer.observe(object);
      });
    });
  }

  #createFirefly(index) {
    const firefly = document.createElement("div");
    const ceiling = 10;
    const maxCeiling = 6000;
    const maxFloor = 5000;
    const animationDelayMax = 8000;
    const animationDelayMin = 500;
    const floor = 8;
    firefly.classList.add("firefly");

    firefly.style.left = `${Math.random() * this.ceiling}%`;
    firefly.style.top = `${Math.random() * this.ceiling}%`;

    const rotationSpeed = Math.floor(Math.random() * ceiling) + floor;

    const beforeElement = document.createElement("style");
    beforeElement.textContent = `
      .firefly:nth-child(${index})::before {
        animation-duration: ${rotationSpeed}s;
      }
    `;
    document.head.appendChild(beforeElement);

    const afterElement = document.createElement("style");
    afterElement.textContent = `
      .firefly:nth-child(${index})::after {
        animation-duration: ${rotationSpeed}s, ${
      Math.floor(Math.random() * maxCeiling) + maxFloor
    }ms;
        animation-delay: 0ms, ${
          Math.floor(Math.random() * animationDelayMax) + animationDelayMin
        }ms;
      }
    `;
    document.head.appendChild(afterElement);

    return firefly;
  }

  #animateFirefly(firefly) {
    const duration = Math.random() * 10 + 5;
    const startX = parseFloat(firefly.style.left);
    const startY = parseFloat(firefly.style.top);
    const endX = Math.random() * this.ceiling;
    const endY = Math.random() * this.ceiling;
    const topDuration = 1000;

    const animation = firefly.animate(
      [
        { left: `${startX}%`, top: `${startY}%` },
        { left: `${endX}%`, top: `${endY}%` },
      ],
      {
        duration: duration * topDuration,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );

    animation.onfinish = () => {
      firefly.style.left = `${endX}%`;
      firefly.style.top = `${endY}%`;
      this.#animateFirefly(firefly);
    };
  }

  #animateImages() {
    document.addEventListener("DOMContentLoaded", () => {
      this.#changeBorderColor();
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            } else {
              entry.target.classList.remove("visible");
            }
          });
        },
        { threshold: 0.5 }
      );
      this.imageWrapper.forEach((img) => {
        observer.observe(img);
      });
    });
  }

  #changeBorderColor() {
    const colors = ["#c0eba6", "#3C3D37"];
    const increment = 1;
    const milliseconds = 3000;
    let currentColorIndex = 0;

    if (this.imageBorder) {
      setInterval(() => {
        currentColorIndex = (currentColorIndex + increment) % colors.length;
        this.imageBorder.style.borderColor = colors[currentColorIndex];
      }, milliseconds);
    }
  }

  #animateAlbum() {
    document.addEventListener("DOMContentLoaded", () => {
      const album = document.querySelector(".album");
      const cards = document.querySelectorAll(".card");
      const threshold = 0.1;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              album.classList.add("visible");
              animateCards();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: threshold }
      );

      observer.observe(album);

      function animateCards() {
        const timeout = 100;
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("visible");
          }, index * timeout);
        });
      }
    });
  }

  #getEmailTemplate() {
    console.log(this.txtName.value);
    return {
      service_id: "service_z9wibge",
      template_id: "template_y5499vd",
      user_id: "gg29ZiD4BQUCkQ-9P",
      template_params: {
        from_name: `${this.txtName.value}, ${this.txtEmail.value}`,
        message: this.txtMessage.value,
      },
    };
  }

  #sendMessage() {
    this.btnSend.addEventListener("click", async (event) => {
      event.preventDefault();

      this.#getEmailTemplate();
      await axios
        .post(
          "https://api.emailjs.com/api/v1.0/email/send",
          this.#getEmailTemplate(),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          this.txtName.value = "";
          this.txtEmail.value = "";
          this.txtMessage.value = "";
          const toast = new bootstrap.Toast(this.toastEl);
          toast.show();
        })
        .catch(() => {});
    });
  }
}

export default new Index();
