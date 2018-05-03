$(document).ready(function () {
    let errorContainer = $('#error-container');
    let contentContainer = $('#content-container');
    let tableRowTemplate = $('#table-row-template').html();

    $.get('http://localhost:8080/songs').then(displayContent, showError);

    $(document).on('click', '.remove-action', function () {
        let clickedElement = $(this);
        console.log(this);
        let songId = clickedElement.data('id');

        $.ajax({
            url: 'http://localhost:8080/songs/' + songId,
            method: 'DELETE'
        }).then(function () {
            handleRemoveSuccess(clickedElement)
        }, showError);

    });

    function handleRemoveSuccess(clickedElement) {
        alert('Song removed successfully');
        clickedElement.parent().parent().remove();
    }

    function showError(error) {
        console.log(error);
        errorContainer.text('Backend respond with status ' + error.status + '. Description: ' + error.statusText);
        errorContainer.show();
    }

    function displayContent(data) {
        let tableContainer = contentContainer.find('table');
        let content = '';
        console.log(data);
        data.forEach(function (item) {
            content += Mustache.render(tableRowTemplate, item)
        });
        tableContainer.append(content);
        contentContainer.show();
    }
});

