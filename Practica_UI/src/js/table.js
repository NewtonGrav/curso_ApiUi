$(document).ready(function () {
	let tableHtml = $("#tablePersons");
	let miAlert = $("#miAlert");

	const ajaxLoadTableData = () => {
		$.ajax({
			url: "https://localhost:5001/api/Table/GetPersons",
			method: "GET",
			dataType: 'json',
			success: function (data) {
				let persons = data;

				let html = generateTableOf(persons);

				tableHtml.append(html);
			},
			error: (error) => console.log(JSON.stringify(error))
		});
	};

	const generateTableOf = (persons) => {
		let html = "";

		const getFilaWhit = (fullName, dni) => {
			return `
				<tr id="${dni}">
					<td>
						<button type="button" class="btnDeletePerson btn btn-danger mr-4">
							Eliminar
						</button>
					 	${fullName} 
					</td>
					<td> ${dni}  </td>
				</tr>`
		};

		persons.map((p) => {
			html += getFilaWhit(p.fullName, p.dni);
		});

		return html;
	};

	ajaxLoadTableData();

	const ajaxAddPerson = (fullName, dni) => {
		let data = { fullName, dni };

		$.ajax({
			url: "https://localhost:5001/api/Table/AddPerson",
			type: "PUT",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: (personAdded) => {
				debugger
				tableHtml.append(generateTableOf([personAdded]));
				showAlert("Se agrego una persona :)", "success");
			},
			error: (error) => showAlert(`Error ${error.status}: ${error.responseText}`, "warning")
		});

	}

	$("#btnAddPerson").click(function () {
		let fullName = $("#fFullName").val();
		let dni = $("#fDni").val();

		if (fullName !== "" && dni.length >= 8)
			ajaxAddPerson(fullName, dni);
		else
			showAlert("Los datos ingresados son incorrectos", "info");
	});

	const ajaxDeletePerson = (dniPerson) => {
		return $.ajax({
			url: `https://localhost:5001/api/Table/DeletePerson?dniPerson=${dniPerson}`,
			type: "DELETE",
			success: (data) => {
				showAlert(data.message, "success");
			},
			error: (error) => console.log(error)
		});
	}

	//Elegacion de eventos: En vez de escuchar al boton, escucho a su contenedor principal, la tabla. De esta forma resgistro una unica vez el evento
	$("#tablePersons").on("click", ".btnDeletePerson", function () {
		//Busca el texto en la celda DNI(buttton -> td(fullName) -> td(dni)). 
		//Al agregar celdas cambiar logica para buscar el siblings(elemento hermano) correcto
		let dniPersonToDelete = $(this).parent().siblings().text();
		dniPersonToDelete = dniPersonToDelete.trim();

		if (dniPersonToDelete.length == 8) {
			ajaxDeletePerson(dniPersonToDelete)
				.then((res) => {
					let rowToDelete = $(this).parent().parent();
					$(rowToDelete).remove();
				});
		}
		else
			showAlert("Datos invalidos. Verifiquelos", "info");
	});

	// Funcionalidades
	const showAlert = (msg, type) => {
		let alertHtml = `
		<div id="innerAlert" class="alert alert-${type} alert-dismissible fade" role="alert">
			<p> ${msg}</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
		`
		miAlert.html(alertHtml);

		$("#innerAlert").toggleClass("show");
	};

	// Tests
	var personas = [
		{ fullName: "Pedro Picapiedra", dni: "11223344" },
		{ fullName: "Pedro Picapiedra", dni: "34234233" },
		{ fullName: "Pedro Picapiedra", dni: "45445422" },
		{ fullName: "Pedro Picapiedra", dni: "45422323" },
		{ fullName: "Pedro Picapiedra", dni: "55522234" },
		{ fullName: "Pedro Picapiedra", dni: "88852i44" },
		{ fullName: "Pedro Picapiedra", dni: "34342222" },
		{ fullName: "Pedro Picapiedra", dni: "22463484" },
		{ fullName: "Pedro Picapiedra", dni: "45362342" }
	]
	//tableHtml.append(generateTableOf(personas));
})