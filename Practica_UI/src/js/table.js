$(document).ready(function () {
	let tableHtml = $("#tablePersons");
	let miAlert = $("#miAlert");

	const ajaxCargarDatosATabla = () => {
		$.ajax({
			url: "https://localhost:5001/api/Table/GetPersons",
			method: "GET",
			dataType: 'json',
			success: function (data) {
				let persons = data;

				let html = generarTablaDe(persons);

				tableHtml.append(html);
			},
			error: (error) => console.log(JSON.stringify(error))
		});
	};

	const generarTablaDe = (persons) => {
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

	ajaxCargarDatosATabla();

	const ajaxAgregarPersona = (fullName, dni) => {
		let data = { fullName, dni };

		$.ajax({
			url: "https://localhost:5001/api/Table/AddPerson",
			type: "PUT",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: (personAdded) => {
				tableHtml.append(generarTablaDe([personAdded]));
				mostrarAlerta("Se agrego una persona :)", "success");
			}, 
			error: (error) => mostrarAlerta(`Error ${error.status}: ${error.responseText}`, "warning")
		});

	}

	$("#btnAddPerson").click(function () {
		let fullName = $("#fFullName").val();
		let dni = $("#fDni").val();

		if (fullName !== "" && dni.length >= 8)
			ajaxAgregarPersona(fullName, dni);
		else
			alert("Datos ingresados incorrectos");
	});

	// Funcionalidades
	const mostrarAlerta = (msg, type) => {
		let alertHtml = `
		<div id="innerAlert" class="alert alert-${type} alert-dismissible fade" role="alert">
			<p> ${msg}</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
		`
		miAlert.append(alertHtml);

		$("#innerAlert").toggleClass("show");
	};

	// Tests
	var personas = [
		{ fullName: "Pedro Picapiedra", dni: "11223344" },
		{ fullName: "Pedro Picapiedra", dni: "11223344" },
		{ fullName: "Pedro Picapiedra", dni: "11223344" },
		{ fullName: "Pedro Picapiedra", dni: "11223344" },
		{ fullName: "Pedro Picapiedra", dni: "11223344" },
		{ fullName: "Pedro Picapiedra", dni: "11223344" },
		{ fullName: "Pedro Picapiedra", dni: "11223344" },
		{ fullName: "Pedro Picapiedra", dni: "11223344" },
		{ fullName: "Pedro Picapiedra", dni: "11223344" }
	]
	//tableHtml.append(generarTablaDe(personas));
})