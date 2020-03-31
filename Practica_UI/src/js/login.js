$(document).ready(function () {

    const ajaxlogin = (userName, password) => {
        if (userName != "" && password.length >= 5) {
            let data = { userName, password };

            $.ajax({
                url: "https://localhost:5001/api/LoginCrud/Login",
                method: "POST",
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: ({ message }) => {
                    window.location = "https://localhost:44326/" + message;
                },
                error: (error) => console.log(error.responseText)
            });
        }
        else alert("Complete los campos")
    }

    const ajaxChangePassword = (userName, password, newPassword) => {
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
                error: (error) => alert(error.responseText)
            });
        }
        else alert("Complete los campos");
    }

    const ajaxCreateUser = (userName, password, defaultPage) => {
        let data = { userName, password, defaultPage };

        $.ajax({
            url: "https://localhost:5001/api/LoginCrud/CreateUser",
            method: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: ({ message }) => {
                alert(message);
            },
            error: (error) => alert(error.responseText)
        });
    };

    $("#btnLogin").click(function (e) {
        let userName = $("#fEmail").val();
        let password = $("#fPass").val();

        ajaxlogin(userName, password);

    })

    $("#btnAceptChangePass").click(function (e) {
        let userName = $("#fNewPassEmail").val();
        let oldPass = $("#fOldPass").val();
        let newPass = $("#fNewPass").val();

        ajaxChangePassword(userName, oldPass, newPass)
    });

    $("#btnCreateNewUser").click(function (e) {
        let userName = $("#fNewUserEmail").val();
        let password = $("#fNewUserPass").val();
        let defaultPage = $("#fNewUserPage").val();

        ajaxCreateUser(userName, password, defaultPage);

    });

});
