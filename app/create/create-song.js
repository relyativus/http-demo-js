$(document).ready(function () {
    let createSong = $('#create-song');
    let errorContainer = $('#error-container');

    createSong.click(function () {
        createSong.prop('disabled', true);
       let formContainer = $(this).parent();
       let formData = new FormData();
       formData.append('trackName', formContainer.find('input[name="trackName"]').val());
       formData.append('author', formContainer.find('input[name="author"]').val());
       formData.append('genres[0]', formContainer.find('input[name="genre"]').val());
       formData.append('content', formContainer.find('input[name="content"]')[0].files[0]);

        $.ajax({
            url: 'http://localhost:8080/songs',
            data: formData,
            processData: false,
            contentType: false,
            method: 'POST'
        }).then(handleCreateSuccess, handleCreateFailed);
    });

    function handleCreateSuccess() {
        errorContainer.hide();
        alert('Song created successfully');
        window.location = '/list/index.html'
    }

    function handleCreateFailed(error) {
        errorContainer.text('Backend respond with status ' + error.status + '. Description: '+ error.statusText);
        errorContainer.show();
        createSong.prop('disabled', false);
    }

});