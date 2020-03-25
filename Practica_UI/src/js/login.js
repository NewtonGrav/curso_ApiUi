﻿$(document).ready(function () {

	$("#btnLogin").click(function (e) {
		let userName = $("#fEmail").val();
		let password = $("#fPass").val();

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
		else
			alert("Complete los campos")
	})

	$("#btnAceptChangePass").click(function (e) {
		let userName = $("#fNewPassEmail").val();
		let newPass = $("#fNewPass").val();

		if (userName != "" && newPass.length >= 5) {
			let data = { userName, newPass };	 // TODO: Modificar data (acorde al service) del ajax para cambio de contrasenia

			$.ajax({
				url: "/service.asmx/ChangePassword",	//TODO: Modificar URL
				method: "PUT",		
				data: JSON.stringify(data),
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				success: (data) => {	// TODO: Manejar "success" para el cambio de contrasenia
					
					alert(data.Message);
					// TODO: Sacar la clase "show" del modal cambio de conntrassenia para ocultarlo

				},
				error: (error) => alert(JSON.stringify(error))
			});
		} else
			alert("Complete los campos");
	});	   //TODO: Finalizar implementacion

	$("#btnCreateNewUser").click(function (e) {
		let data = {
			userName: $("#fNewUserEmail").val(),
			password: $("#fNewUserPass").val(),
			defaultPage: $("#fNewUserPage").val()
		};

		debugger
		$.ajax({
			url: "https://localhost:5001/api/LoginCrud/CreateUser",
			method: "POST",
			data: JSON.stringify(data),
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			success: function ({ message }) {		//TODO: Manejar "success" para la cracion de usuario
				alert(message);
			},
			error: (error) => alert(JSON.stringify(error))		//Manejar "error" de la creacion de usuario
		});
	});

});
