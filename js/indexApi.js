var app = new Vue({
  el: "#app",
  data: {
    date: "",
    selectValue: "",
    NumeroCuenta: "",
    vvalorPago: 0,
    valorPlan: 0,
    valorRickPoint: 0,
    pasoAcompra: false,
    plan1: 15000,
    userlogueado: JSON.parse(localStorage.getItem("UsuarioLogueado")),
    InputUser: null,
    InputPassword: null,
    user: [],
    InputName: null,
    InputEmail: null,
    InputPhone: null,
    InputNameUser: null,
    InputPasswordUser: null,
    errorRegistry: false,
    users: [],
    pass: [],
    userlogin: null,
  },
  methods: {


    registrar() {
      if (
        this.InputName != null &&
        this.InputEmail != null &&
        this.InputPhone != null &&
        this.InputNameUser != null &&
        this.InputPasswordUser != null
      ) {
        console.log("entro");
        this.user = JSON.parse(localStorage.getItem("EntradaUsuarios")) || [];
        this.user.push({
          name: this.InputName,
          email: this.InputEmail,
          phone: this.InputPhone,
          nickname: this.InputNameUser,
          password: this.InputPasswordUser,
          money:0,
        });
        localStorage.setItem("EntradaUsuarios", JSON.stringify(this.user));
      } else {
        this.errorRegistry = true;
      }

      window.location.reload();
    },

    validarUsuario() {
      if (this.InputUser && this.InputPassword) {
        // verificar si los campos no son nulos ni indefinidos
        this.user = JSON.parse(localStorage.getItem("EntradaUsuarios"));
        this.users = this.user.find(
          (u) =>
            u.nickname === this.InputUser && u.password === this.InputPassword
        );


        if (this.users) {
          // verificar si se encontró un usuario válido
          this.userlogin = this.users; // establecer el usuario actual
         

          localStorage.setItem(
            "UsuarioLogueado",
            JSON.stringify(this.userlogin)
          );
          setTimeout(() => {
            window.location = "/pages/tarjetas.html";
          }, 100);
        }
      }
    },
  },

  created() {},
});
