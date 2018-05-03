$(document).ready(function () {
    let updateFieldTemplate = $('#form-fields').html();
    let errorContainer = $('#error-container');
    let fieldsContainer = $('#fields-container');
    let updateButton = $('#update-song');
    let currentPageUrl = new URL(window.location.href);
    let songId = currentPageUrl.searchParams.get("songId");

    $.get('http://localhost:8080/songs/' + songId).then(showUpdateForm, showError);

    $(document).on('click', '#update-song', function () {
        let songId = $(fieldsContainer).find('input[name="id"]').val();
        let trackName = $(fieldsContainer).find('input[name="trackName"]').val();
        let author = $(fieldsContainer).find('input[name="author"]').val();
        updateButton.prop('disabled', true);

        let updates = {
            "trackName": trackName,
            "author": author
        };
        $.ajax({
            url: 'http://localhost:8080/songs/'+songId,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updates)
        }).then(handleUpdateSuccess, showError);
    });

    function handleUpdateSuccess() {
        alert('Song updated!')
        window.location = '/list/index.html';
    }

    function showUpdateForm(data) {
        let fields = Mustache.to_html(updateFieldTemplate, data);
        fieldsContainer.append(fields);
    }

    function showError(error) {
        errorContainer.text('Backend respond with status ' + error.status + '. Description: ' + error.statusText);
        errorContainer.show();
    }
});