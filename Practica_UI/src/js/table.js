$(document).ready(function () {
	let tableHtml = $("#tablePersons");

	const cargarDatosATabla = () => {
		$.ajax({
			url: "https://localhost:5001/api/Table/GetPersons",
			method: "GET",
			dataType: 'json',
			success: function (data) {
				let persons = data;

				let html = insertarTabla(persons);

				tableHtml.append(html);
			},
			error: (error) => console.log(JSON.stringify(error))
		});
	};

	const insertarTabla = (persons) => {
		let html = "";

		const getFilaCon = (fullName, dni) => {
			return `
				<tr>
					<td> ${fullName} </td>
					<td> ${dni}  </td>
				</tr>`
		};

		persons.map((p) => {
			html += getFilaCon(p.fullName, p.dni);
		});

		return html;
	};

	cargarDatosATabla();

	//TODO: Peticion para insertar Personas a la tabla
	
})