function setImages(data) {
    if (data.length > 0) {
        globalDataList = JSON.parse(JSON.stringify(data));
        destroyPagination();
    } else {
        globalDataList = JSON.parse(JSON.stringify(globalPlaceholders));
        destroyPagination();
        $('#errSpace').text('No images matching criteria found. Please try a different combo.')
    }
}

$("#submitButton").click(function () {
    $('#errSpace').text('');
    globalDataList = JSON.parse(JSON.stringify(globalSearch));
    destroyPagination();
    let ageRanger = $('#age-range');
    let ageRange = ageRanger.range('get thumb value', 'second') + '^' + ageRanger.range('get thumb value');
    let genderSelector = $('.radio.checkbox.checked input')[0]
    let gender =  genderSelector ? genderSelector.id : 'gender-any';
    let choices = _.map($('.binary.checkbox.checked input'), input => input.id).join('*');
    let trueChoices = [];
    let falseChoices = [];
    $('.toggleButton').each(function() {
        let button = $(this);
        let state = button.attr('selectState');
        if (state && state == 2) {
            trueChoices.push(button.attr('filterField'));
        } else if (state && state == 3) {
            falseChoices.push(button.attr('filterField'));
        }
    });
    const falseChoicesStr = falseChoices.join('*');
    const trueChoicesStr = trueChoices.join('*');
    let emotion = $('#emotion-dropdown').dropdown('get value');
    let x1 = Math.round(camera.rotation.x / (1 / 180 * Math.PI));
    let x2 = Math.round(camera.rotation.x + (camera.rotation.z * Math.PI) );
    let x3 = Math.round(360 * camera.rotation.x / Math.PI );
    let y1 = Math.round(camera.rotation.y / (1 / 180 * Math.PI)) ;
    let y2 = Math.round(camera.rotation.y + (camera.rotation.z * Math.PI) );
    let y3 = Math.round(360 * camera.rotation.y / Math.PI );
    let z1 = Math.round(camera.rotation.z / (1 / 180 * Math.PI));
    let z2 = Math.round(camera.rotation.z + (camera.rotation.x * Math.PI) );
    let z3 = Math.round(360 * camera.rotation.z * camera.rotation.x);
    let paramString = $.param({
        trueChoices: trueChoicesStr,
        falseChoices: falseChoicesStr,
        gender,
        emotion,
        x1, x2, x3, y1, y2, y3, z1, z2, z3,
        ageRange
    });
    let url = `${window.location.href}api/facePoses?${paramString}`;
    gtag('event', 'made search', {
        'event_category': 'na',
        'event_label': 'na',
        'value': paramString
    });
    $.ajax({url,
        beforeSend: function(xhr){xhr.setRequestHeader('X-param-header', 1300*((new Date()).valueOf()))},
        timeout: 5000,
        success: function (data) {
            setTimeout(() => {
                setImages(data);
            }, 100)
        },
        error: function (error) {
        Sentry.captureException(new Error("Error fetching images from db"));
            globalDataList = [];
            destroyPagination();
            $('#errSpace').text('An error occurred. Please try again later.');
        }
    });
});
