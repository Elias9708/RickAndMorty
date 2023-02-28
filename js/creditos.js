const app = new Vue({
  el: "#app",
  data: {
    selectedPoint: "",
    selectValue: "",
    NumeroCuenta: "",
    correo: "",
    userlogueado: JSON.parse(localStorage.getItem("UsuarioLogueado")),
  },
  methods: {
   CompraRickPoints() {
  // if (this.selectValue === "pse") {
  //   if (!this.isValidEmail(this.correo)) {
  //     Swal.fire("Error", "Por favor introduzca un correo válido.", "error");
  //     return;
  //   }
  // }
  // else 
  // if (this.selectValue === "numerocuenta") {
    const numCuentaRegex = /^\d{10}$/;
    if (!numCuentaRegex.test(this.NumeroCuenta)) {
      Swal.fire("Error", "Por favor introduzca un número de cuenta válido (10 dígitos).", "error");
      return;
    }
  // }
  
  Swal.fire("Compra Exitosa", "Gracias por comprar RICKPOINTS.", "success");

  this.userlogueado.money += Number(this.selectedPoint);
  localStorage.setItem("UsuarioLogueado", JSON.stringify(this.userlogueado));

  setTimeout(() => {
    window.location = "tarjetas.html";
  }, 1000);

},
    // isValidEmail(email) {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   return emailRegex.test(email);
    // },
  },
});

$(function(){
  $('[data-toggle="tooltip"]').tooltip();
});
