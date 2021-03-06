﻿$(document).ready(function () {
    let tableHtml = $("#tablePersons");
    let miAlert = $("#miAlert");
    let token = localStorage.getItem('token');


    ajaxLoadTableData(token)
        .catch(error => {
            redirectionAlert(error);
        });



    // Eventos
    $("#btnAddPerson").click(function () {
        let name = $("#fName").val().trim();
        let surName = $("#fSurName").val().trim();
        let dni = parseInt($("#fDni").val().trim());
        let cantDigitosDni = Math.floor(Math.log10(dni)) + 1;

        if (name !== "" && surName !== "" && cantDigitosDni >= 7)
            ajaxAddPerson(name, surName, dni)
                .catch(error => {
                    redirectionAlert(error);
                });
        else
            showAlert("Ingrese los datos para continuar o verifíquelos", "info");
    });

	/*
	 * Delegacion de eventos: En vez de escuchar a tdodos los botones 
	 * se lo hace a su contenedor principal que es la tabla.
	**/
    $("#tablePersons").on("click", ".btnDeletePerson", function () {
        //Se definio en el ID de cada celda el dni de cada persona
        let dniPersonToDelete = $(this).parent().parent().attr("id");

        ajaxDeletePerson(dniPersonToDelete)
            .then(res => {
                let rowToDelete = $(this).parent().parent();
                $(rowToDelete).remove();
            })
            .catch(error => {
                redirectionAlert(error);
            });
    });



    // Peticiones
    const ajaxLoadTableData = (token) => {
        let parameters = `?token=${token}`

        return $.ajax({
            url: `https://localhost:5003/api/Table/GetPersons${parameters}`,
            method: "GET",
            dataType: 'json',
            success: function (data) {
                let persons = data;
                let html = generateTableOf(persons);

                tableHtml.append(html);
            }
        });
    };

    const ajaxAddPerson = (name, surName, dni) => {
        let parameters = `?token=${token}`
        let data = { name, surName, dni };

        return $.ajax({
            url: `https://localhost:5003/api/Table/AddPerson${parameters}`,
            type: "PUT",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: (personAdded) => {
                tableHtml.append(generateTableOf([personAdded]));
                showAlert("Se agrego una persona.", "success");
            },
            error: (error) => alertError(error)
        });
    }

    const ajaxDeletePerson = (dniPerson) => {
        let parameters = `?dniPerson=${dniPerson}&token=${token}`

        return $.ajax({
            url: `https://localhost:5003/api/Table/DeletePerson${parameters}`,
            type: "DELETE",
            success: (data) => {
                showAlert(data.message, "success");
            },
            error: (error) => alertError(error)
        });
    }



    // Funcionalidades
    const generateTableOf = (persons) => {
        //persons: Array de personas
        let html = "";

        const createFilaWhit = (name, surName, dni) => {
            return `
				<tr id="${dni}">
					<td>${name}</td>
					<td>${surName}</td>
					<td>${dni}</td>
					<td>
						<button type="button" class="btnDeletePerson btn btn-danger mr-4">
							Eliminar
						</button>
					</td>
				</tr>`
        };

        persons.map((p) => {
            html += createFilaWhit(p.name, p.surName, p.dni);
        });

        return html;
    };

    const redirectionAlert = (error) => {
        alertError(error, "Se te redireccionara en unos segundos");
        if (error.status == 400 || error.status === 401) {
            setTimeout(function () {
                window.location.href = window.origin += "/Login.html";
            }, 5000);
        }
    };

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

    const alertError = (error, secundaryMsg) => {
        let typeError = "danger";

        if (error.readyState !== 0) {
            let status = `Error ${error.status}:`;
            if (error.responseJSON !== undefined)
                showAlert(`${status} ${JSON.stringify(error.responseJSON.errors)}`, typeError);
            else
                showAlert(`${status} ${error.responseText}<br>${secundaryMsg}`, typeError)
        } else
            showAlert("No hay conexión con el servidor.", typeError);

    };



    // Tests
    var personas = [
        { name: "Pedro", surName: "Picapiedra", dni: "11223344" },
        { name: "Pedro", surName: "Picapiedra", dni: "34234233" },
        { name: "Pedro", surName: "Picapiedra", dni: "45445422" },
        { name: "Pedro", surName: "Picapiedra", dni: "45422323" },
        { name: "Pedro", surName: "Picapiedra", dni: "55522234" },
        { name: "Pedro", surName: "Picapiedra", dni: "88852244" },
        { name: "Pedro", surName: "Picapiedra", dni: "34342222" },
        { name: "Pedro", surName: "Picapiedra", dni: "22463484" },
        { name: "Pedro", surName: "Picapiedra", dni: "45362342" }
    ]
    //tableHtml.append(generateTableOf(personas));
})