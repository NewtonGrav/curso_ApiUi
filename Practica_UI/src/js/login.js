$(document).ready(function () {

    const login = (userName, password) => {
        if (userName != "" && password.length >= 5) {
            let data = { userName, password };

            //stringify --> Objeto JS a JSON
            $.ajax({
                url: "https://localhost:5001/api/LoginCrud/Login",
                method: "POST",
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function ({ message }) {
                    window.location = "https://localhost:44326/" + message;
                },
                error: (error) => console.log(JSON.stringify(error))	//TODO: Manejar "error" de intento de Logeo
            });
        }
        else alert("Complete los campos")
    }

    const changePassword = (userName, password, newPassword) => {
        if (userName != "" && newPassword.length >= 5) {
            let user = { userName, password };	 
            let data = { user, newPassword };

            $.ajax({
                url: "https://localhost:5001/api/LoginCrud/UpdatePassword",
                method: "PUT",
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: ({ message }) => {
                    alert(message);
                },
                error: (error) => alert(JSON.stringify(error))
            });
        }
        else alert("Complete los campos");
    }

    const createUser = (userName, password, defaultPage) => {
        let data = { userName, password, defaultPage };

        $.ajax({
            url: "https://localhost:5001/api/LoginCrud/CreateUser",
            method: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function ({ message }) {		//TODO: Manejar "success" para la cracion de usuario
                alert(message);
            },
            error: (error) => alert(JSON.stringify(error))		//TODO: Manejar "error" de la creacion de usuario
        });
    };

    $("#btnLogin").click(function (e) {
        let userName = $("#fEmail").val();
        let password = $("#fPass").val();

        login(userName, password);

    })

    $("#btnAceptChangePass").click(function (e) {
        let userName = $("#fNewPassEmail").val();
        let oldPass = $("#fOldPass").val();
        let newPass = $("#fNewPass").val();

        changePassword(userName, oldPass, newPass)
    });

    $("#btnCreateNewUser").click(function (e) {
        let userName = $("#fNewUserEmail").val();
        let password = $("#fNewUserPass").val();
        let defaultPage = $("#fNewUserPage").val();

        createUser(userName, password, defaultPage);

    });

});
