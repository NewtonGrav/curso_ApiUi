$(document).ready(function () {

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
					console.log(message);
					
					window.location = "https://localhost:44326/" + message;

					//else if (res.Status == "300") {
					//	crearUsuario(userName, password, "Grilla2.html")
					//}

				},
				error: (error) => console.log(JSON.stringify(error))
			});
		}
		else
			alert("Complete los campos")
	})

	//Verificar ID boton
	$("#btnAceptarChangePass").click(function (e) {
		let userName = $("#fNewPassEmail").val();
		let newPass = $("#fNewPass").val();

		if (userName != "" && newPass.length >= 5) {
			let data = { userName, newPass };

			$.ajax({
				url: "/service.asmx/ChangePassword",
				method: "POST",
				data: JSON.stringify(data),
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				success: (data) => {
					let dato = data.d || data;
					dato = JSON.parse(dato);

					if (dato.Status == "ok")
						Console.log("Se cambio la contraseña")
						//Sacar la clase "show" del "modal"
					else
						alert(dato.Message);
				},
				error: (error) => alert(JSON.stringify(error))
			});
		} else {
			alert("Complete los campos");
		}
	});
});

var crearUsuario = (userName, password, page) => {
	let data = { userName, password, page };

	$.ajax({
		url: "/service.asmx/CrearUsuario",
		method: "POST",
		data: JSON.stringify(data),
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			let dato = data.d || data;
			dato = JSON.parse(dato);

			if (dato.Status == "ok")
				window.location = "https://localhost:44379/" + page;

			alert(dato.Message);
		},
		error: (error) => alert(JSON.stringify(error))
	});
};