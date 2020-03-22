$(document).ready(function () {
	var tableHtml = $("#tablePersons");

	$.ajax({
		url: "https://localhost:5001/api/Table/GetPersons",
		method: "GET",
		dataType: 'json',
		success: function (data) {
			let persons = data;

			let html = insertarTabla(persons);

			tableHtml.append(html);

			//else if (res.Status == "300") {
			//	crearUsuario(userName, password, "Grilla2.html")
			//}

		},
		error: (error) => console.log(JSON.stringify(error))
	});


	var insertarTabla = (persons) => {
		let html = "";

		persons.map((p) => {
			html += getFilaCon(p.fullName, p.dni);
		});

		return html;
	};

	var getFilaCon = (fullName, dni) => {
		return `<tr>
					<td> ${fullName} </td>
					<td> ${dni}  </td>
				</tr>`
	};
})