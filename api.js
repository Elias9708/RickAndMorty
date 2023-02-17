const app = new Vue({
    el: '#app',
    data: {
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
            if (this.InputName != null && this.InputEmail != null && this.InputPhone != null && this.InputNameUser != null
                && this.InputPasswordUser != null) {
                console.log("entro");
                this.user = JSON.parse(localStorage.getItem("EntradaUsuarios")) || [];
                this.user.push({
                    name: this.InputName,
                    email: this.InputEmail,
                    phone: this.InputPhone,
                    nickname: this.InputNameUser,
                    password: this.InputPasswordUser
                })
                localStorage.setItem("EntradaUsuarios", JSON.stringify(this.user));
            } else {
                this.errorRegistry = true;
            }

            window.location.reload();
        },

        validarUsuario() {
            if (this.InputUser && this.InputPassword) { // verificar si los campos no son nulos ni indefinidos
                this.user = JSON.parse(localStorage.getItem("EntradaUsuarios"));
                this.users = this.user.find(u => u.nickname === this.InputUser && u.password === this.InputPassword);
        
                if (this.users) { // verificar si se encontró un usuario válido
                    this.userlogin = this.users; // establecer el usuario actual
                    localStorage.setItem("UsuarioLogueado", JSON.stringify(this.userlogin));
                    setTimeout(() => {
                        window.location = "index.html";
                    }, 1000);
                    console.log(this.userlogin);
                }
            }
        },

        compraCreditos(){
            setTimeout(() => {
                window.location = "creditos.html";
            }, 1000);

        }

    }
});






// const app = new Vue({
//     el: '#app',
//     data: {
//         InputUser: null,
//         InputPassword: null,
//         user: [],
//         InputName: null,
//         InputEmail: null,
//         InputPhone: null,
//         InputNameUser: null,
//         InputPasswordUser: null,
//         errorRegistry: false,
//         users: [],
//         pass: [],
//         userlogin: null,


//     },

//     methods: {
//         registrar() {
//             if (this.InputName != null && this.InputEmail != null && this.InputPhone != null && this.InputNameUser != null
//                 && this.InputPasswordUser != null) {
//                 console.log("entro");
//                 this.user = JSON.parse(localStorage.getItem("EntradaUsuarios")) || [];
//                 this.user.push({
//                     name: this.InputName,
//                     email: this.InputEmail,
//                     phone: this.InputPhone,
//                     nickname: this.InputNameUser,
//                     password: this.InputPasswordUser
//                 })
//                 localStorage.setItem("EntradaUsuarios", JSON.stringify(this.user));

//             } else {
//                 this.errorRegistry = true;
//             }

//             window.location.reload();


//         },

//         validarUsuario() {
//             if (this.InputUser && this.InputPassword) { // verificar si los campos no son nulos ni indefinidos
//                  this.user = JSON.parse(localStorage.getItem("EntradaUsuarios"));
//                  this.users = user.find(u => u.nickname === this.InputUser && u.password === this.InputPassword);
        
//                 if (users) { // verificar si se encontró un usuario válido
//                     this.userlogin = users; // establecer el usuario actual
//                     setTimeout(() => {
//                         window.location = "index.html";
//                     }, 1000);
//                     console.log(this.userlogin);
//                 }
//             }
//         }
        

        // validarUsuario() {
        //     if (this.InputUser != null && this.InputPassword != null) {
        //         this.user = JSON.parse(localStorage.getItem("EntradaUsuarios"));

        //         this.users = this.user.filter(function (user) {
        //             return user.nickname == this.InputNameUser;
        //         })
        //         this.pass = this.user.filter(function (user) {
        //             return user.password == this.InputPassword;
        //         })

        //         if (this.users && this.pass) {

        //             if(this.users){
        //                 this.userlogin = this.users;
        //             }
        //             setTimeout(function () {
        //                 window.location = "index.html";
        //             }, 1000);
        //             console.log(this.userlogin);
                    
        //         }
        //     }


        // }


    

// },

    



// })
