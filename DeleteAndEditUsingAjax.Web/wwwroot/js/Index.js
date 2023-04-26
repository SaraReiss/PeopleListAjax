$(() => {
    const addmodal = new bootstrap.Modal($("#add-modal")[0]);
    const editmodal = new bootstrap.Modal($("#edit-modal")[0]);


  function refreshTable() {
        $("tbody").empty();
        $.get('/home/getpeople', function (people) {
            people.forEach(function (person) {
                $("tbody").append(`<tr>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.age}</td>
            <td><button data-edit-person-id='${person.id}' class='btn btn-warning edit'>Edit</button></td>
            <td><button data-person-id='${person.id}' class='btn btn-danger delete'>Delete</button></td>
</tr>`)
            });
        });
    }

    refreshTable();

    $("#add-person").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        addmodal.show();
    });
    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();

        $.post('/home/addperson', { firstName, lastName, age }, function () {
            addmodal.hide();
            refreshTable();
        });


    });


   
    $("table").on('click', '.edit', function () {
        const id = $(this).data('edit-person-id');
        $.post('/home/getpersonfromid', {id}, function (person) {
            $("#firstNameE").val(person.firstName);
            $("#lastNameE").val(person.lastName);
            $("#ageE").val(person.age);
            $("#IdE").val(person.id);
            editmodal.show();

        });
     
    });
    $("#update-person").on('click', function () {
      
        const firstName = $("#firstNameE").val();
        const lastName = $("#lastNameE").val();
        const age = $("#ageE").val();
        const id = $("#IdE").val();

        $.post('/home/editperson', { id, firstName, lastName, age }, function () {
            editmodal.hide();
            refreshTable();
        });


    });



    $("table").on('click', '.delete', function () {
        const button = $(this);
        const id = button.data('person-id');

        $.post('/home/deleteperson', {id}, function () {
            refreshTable();
        });
    });


})