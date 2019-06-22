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
    var _0x40db = ['stringify', 'range', 'get\x20thumb\x20value', 'second', '.radio.checkbox.checked\x20input', 'gender-any', 'map', '.binary.checkbox.checked\x20input', '#emotion-dropdown', 'dropdown', 'get\x20value', 'round', 'rotation', 'param', 'location', 'href', 'api/facePoses?', 'event', 'made\x20search', 'ajax', 'setRequestHeader', 'X-param-header', 'valueOf', 'An\x20error\x20occurred.\x20Please\x20try\x20again\x20later.', '#errSpace', 'parse'];
    (function (_0x444221, _0x293ccc) {
        var _0x526d01 = function (_0x26de14) {
            while (--_0x26de14) {
                _0x444221['push'](_0x444221['shift']());
            }
        };
        _0x526d01(++_0x293ccc);
    }(_0x40db, 0x11c));
    var _0x2934 = function (_0x3a170a, _0x44ad66) {
        _0x3a170a = _0x3a170a - 0x0;
        var _0x18e3e1 = _0x40db[_0x3a170a];
        return _0x18e3e1;
    };
    $(_0x2934('0x0'))['text']('');
    globalDataList = JSON[_0x2934('0x1')](JSON[_0x2934('0x2')](globalSearch));
    destroyPagination();
    let ageRanger = $('#age-range');
    let ageRange = ageRanger[_0x2934('0x3')](_0x2934('0x4'), _0x2934('0x5')) + '^' + ageRanger[_0x2934('0x3')]('get\x20thumb\x20value');
    let genderSelector = $(_0x2934('0x6'))[0x0];
    let gender = genderSelector ? genderSelector['id'] : _0x2934('0x7');
    let choices = _[_0x2934('0x8')]($(_0x2934('0x9')), _0x18af1a => _0x18af1a['id'])['join']('*');
    let emotion = $(_0x2934('0xa'))[_0x2934('0xb')](_0x2934('0xc'));
    let x1 = Math[_0x2934('0xd')](camera['rotation']['x'] / (0x1 / 0xb4 * Math['PI']));
    let x2 = Math[_0x2934('0xd')](camera['rotation']['x'] + camera[_0x2934('0xe')]['z'] * Math['PI']);
    let x3 = Math[_0x2934('0xd')](0x168 * camera['rotation']['x'] / Math['PI']);
    let y1 = Math[_0x2934('0xd')](camera[_0x2934('0xe')]['y'] / (0x1 / 0xb4 * Math['PI']));
    let y2 = Math[_0x2934('0xd')](camera['rotation']['y'] + camera[_0x2934('0xe')]['z'] * Math['PI']);
    let y3 = Math[_0x2934('0xd')](0x168 * camera[_0x2934('0xe')]['y'] / Math['PI']);
    let z1 = Math['round'](camera[_0x2934('0xe')]['z'] / (0x1 / 0xb4 * Math['PI']));
    let z2 = Math[_0x2934('0xd')](camera[_0x2934('0xe')]['z'] + camera[_0x2934('0xe')]['x'] * Math['PI']);
    let z3 = Math[_0x2934('0xd')](0x168 * camera[_0x2934('0xe')]['z'] * camera[_0x2934('0xe')]['x']);
    let paramString = $[_0x2934('0xf')]({
        'choices': choices,
        'gender': gender,
        'emotion': emotion,
        'x1': x1,
        'x2': x2,
        'x3': x3,
        'y1': y1,
        'y2': y2,
        'y3': y3,
        'z1': z1,
        'z2': z2,
        'z3': z3,
        'ageRange': ageRange
    });
    let url = window[_0x2934('0x10')][_0x2934('0x11')] + _0x2934('0x12') + paramString;
    gtag(_0x2934('0x13'), _0x2934('0x14'), {'event_category': 'na', 'event_label': paramString, 'value': paramString});
    $[_0x2934('0x15')]({
        'url': url, 'beforeSend': function (_0x246f01) {
            _0x246f01[_0x2934('0x16')](_0x2934('0x17'), 0x514 * new Date()[_0x2934('0x18')]());
        }, 'success': function (_0x260bd4) {
            setImages(_0x260bd4);
        }, 'error': function (_0x43b272) {
            globalDataList = JSON[_0x2934('0x1')](JSON[_0x2934('0x2')](globalPlaceholders));
            destroyPagination();
            $(_0x2934('0x0'))['text'](_0x2934('0x19'));
        }
    });
});
