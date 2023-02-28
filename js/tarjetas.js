var app = new Vue({
  el: "#app",
  data: {
    characters: [],
    info: {},
    gender: "",
    selectedCharacter: {},
    subastando: false,
    ofertaActual: 50, //pujamaxi
    oferta: 0,
    showDiv: false,
    buy: [],
    resultado: "",
    userlogueado: JSON.parse(localStorage.getItem("UsuarioLogueado")),
  },
  methods: {
    async getUsers() {
      const response = await fetch("https://rickandmortyapi.com/api/character")
        .then((response) => response.json())
        .then((data) => {
          this.characters = data.results.map((character) => {
            character.cantidad = 1; // Agregamos una propiedad "cantidad" a cada personaje con valor inicial de 1
            return character;
          });
          localStorage.setItem("charact", JSON.stringify(this.characters));
        });
    },

    handleBid(character) {
      this.subastando = true;
      this.selectedCharacter = character;
      this.ofertaActual =
        this.ofertaActual + (Math.floor(Math.random() * 20) + 10);
      this.oferta = this.ofertaActual + 10;
      this.showDiv = true;
    },

    realizarOferta() {
      if (
        this.oferta == this.ofertaActual + 10 &&
        this.oferta < this.ofertaActual + 20
      ) {
        swal(
          "Oops",
          "la oferta a cambiado ahora tiene un valor de: " +
            (this.ofertaActual + 20),
          "error"
        );
      } else if (this.oferta <= this.ofertaActual + 9) {
        swal(
          "error",
          "la oferta debe ser mayor a " + (this.ofertaActual + 10),
          "error"
        );
      } else if (
        this.userlogueado.money <= this.ofertaActual ||
        this.userlogueado.money < this.oferta
      ) {
        swal(
          "Oops",
          "Tiene dinero insuficiente, por favor recarga RickPoins",
          "error"
        );
      } else {
        Swal.fire({
          title: "Tu ofertas es de: " + this.oferta,
          text: " ¿Seguro que desea pujar?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Sí, pujar!",
        }).then((result) => {
          if (result.isConfirmed) {
            if (this.oferta >= this.ofertaActual) {
              this.ofertaActual = this.oferta;

              this.userlogueado.money =
                Number(this.userlogueado.money) - this.ofertaActual;

              localStorage.setItem(
                "UsuarioLogueado",
                JSON.stringify(this.userlogueado)
              );

              this.buy = JSON.parse(localStorage.getItem("bougth"));

              if (this.buy == null) {
                this.buy = [];
              }

              const boughtCard = this.buy.find(
                (card) => card.idcard === this.selectedCharacter.name
              );
            
              if (boughtCard) {
                // Si la carta ya existe, aumentamos su cantidad
                boughtCard.cantidad += 1;

                // Agregar fecha de compra actual
                boughtCard.fechaCompra = new Date().toLocaleDateString(); 

              } else {
                // Si la carta no existe, la agregamos a la lista de cartas compradas con cantidad de 1
                this.buy.push({
                  idcard: this.selectedCharacter.name,
                  precioCompra: this.oferta,
                  imagen: this.selectedCharacter.image,
                  cantidad: 1,
                  especie: this.selectedCharacter.species,
                });
              }
                console.log(this.buy);
                localStorage.setItem("bougth", JSON.stringify(this.buy));
              }
              Swal.fire("Bravo", "Tu puja ha pasado a ser primera", "success");
            }
          });
        }
        this.showDiv = false;
      },
      agruparCartas() {
        // Obtener la lista de cartas compradas del localStorage
        const boughtCards = JSON.parse(localStorage.getItem("bougth")) || [];
    
        // Crear un objeto que agrupe las cartas por su nombre y sume la cantidad de cartas compradas
        const cardGroups = {};
        boughtCards.forEach((boughtCard) => {
          const cardName = boughtCard.idcard;
          if (cardGroups[cardName]) {
            cardGroups[cardName].cantidad += boughtCard.cantidad;
          } else {
            cardGroups[cardName] = {
              name: cardName,
              imagen: boughtCard.imagen,
              cantidad: boughtCard.cantidad,
              especie: boughtCard.especie,
              fechaCompra: new Date().toLocaleDateString(), // Agregar fecha de compra actual
            };
          }
        });
    
        // Convertir el objeto a una lista de cartas agrupadas
        const result = [];
        Object.keys(cardGroups).forEach((cardName) => {
          result.push(cardGroups[cardName]);
        });
    
        return result;
      },
  
  
      compraCreditos() {
        setTimeout(() => {
          window.location = "creditos.html";
        }, 100);
      },
  
    },

  
    created() {
        this.getUsers();
    },
  });
  