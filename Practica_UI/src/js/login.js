$(document).ready(function () {

    const ajaxlogin = (userName, password) => {
        let data = { userName, password };

        return $.ajax({
            url: "https://localhost:5001/api/LoginCrud/Login",
            method: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: (resul) => {
                let token = resul.guid;
                localStorage.setItem("token", token);

                window.location = "https://localhost:44326/" + resul.message;
            },
            error: (error) => console.log(error.responseText)
        });
    }

    const ajaxChangePassword = (userName, password, newPassword) => {
        let user = { userName, password };	 
        let data = { user, newPassword };

        return $.ajax({
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

    const ajaxCreateUser = (userName, password, defaultPage) => {
        let data = { userName, password, defaultPage };

        return $.ajax({
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

        if (userName != "" && password.length >= 5)
            ajaxlogin(userName, password);
        else
            alert("Complete los campos")
    })

    $("#btnAceptChangePass").click(function (e) {
        let userName = $("#fNewPassEmail").val().trim();
        let oldPass = $("#fOldPass").val().trim();
        let newPass = $("#fNewPass").val().trim();

        if (userName != "" && oldPass.length >= 5 && newPass.length >= 5) {
            ajaxChangePassword(userName, oldPass, newPass)
                .then(res => {
                    $("#changePassModal").modal('hide');
                });
        }
        else
            alert("Complete los campos");
    });

    $("#btnCreateNewUser").click(function (e) {
        let userName = $("#fNewUserEmail").val();
        let password = $("#fNewUserPass").val();
        let defaultPage = $("#fNewUserPage").val();

        ajaxCreateUser(userName, password, defaultPage)
            .then(res => {
                $("#newUserModal").modal('hide');
            });
    });

});
