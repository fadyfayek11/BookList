﻿var dataTable;
$(document).ready(function () {
    loadDataTable();
})

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "api/Book",
            "type": "GET",
            "datatype":"json"
        },
        "columns": [
            { "data": "name", "width": "30%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                                <a href="/ListOfBooks/Upsert?id=${data}" 
                                class="btn btn-success text-white"
                                style="cursor:pointer;width:70px;">Edit</a>
                                 &nbsp;
                                 <a class="btn btn-danger text-white"
                                style="cursor:pointer;width:70px;"
                                    onclick=Delete('/api/book?id='+${data})>Delete</a>
                            </div>`;
                },
                "width":"40%"
            }
        ],
        "language": {
            "emptyTable":"no data found"
        },
        "width":"100%"
    })
}
function Delete(url) {
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        buttons: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    } else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}