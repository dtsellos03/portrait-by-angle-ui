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
    var _0x3341 = ['location', 'api/facePoses?', 'event', 'made\x20search', 'ajax', 'setRequestHeader', 'valueOf', 'An\x20error\x20occurred.\x20Please\x20try\x20again\x20later.', '#errSpace', 'text', 'parse', 'stringify', '#age-range', 'range', 'get\x20thumb\x20value', 'second', '.radio.checkbox.checked\x20input', 'gender-any', 'map', '.binary.checkbox.checked\x20input', 'join', '#emotion-dropdown', 'dropdown', 'round', 'rotation', 'param'];
    (function (_0x4d67a0, _0x5c0473) {
        var _0x48b0e3 = function (_0x1615dc) {
            while (--_0x1615dc) {
                _0x4d67a0['push'](_0x4d67a0['shift']());
            }
        };
        _0x48b0e3(++_0x5c0473);
    }(_0x3341, 0x140));
    var _0x52a9 = function (_0x57b8af, _0x200c9f) {
        _0x57b8af = _0x57b8af - 0x0;
        var _0x4e48c4 = _0x3341[_0x57b8af];
        return _0x4e48c4;
    };
    $(_0x52a9('0x0'))[_0x52a9('0x1')]('');
    globalDataList = JSON[_0x52a9('0x2')](JSON[_0x52a9('0x3')](globalSearch));
    destroyPagination();
    let ageRanger = $(_0x52a9('0x4'));
    let ageRange = ageRanger[_0x52a9('0x5')](_0x52a9('0x6'), _0x52a9('0x7')) + '^' + ageRanger[_0x52a9('0x5')](_0x52a9('0x6'));
    let genderSelector = $(_0x52a9('0x8'))[0x0];
    let gender = genderSelector ? genderSelector['id'] : _0x52a9('0x9');
    let choices = _[_0x52a9('0xa')]($(_0x52a9('0xb')), _0x2cfb08 => _0x2cfb08['id'])[_0x52a9('0xc')]('*');
    let emotion = $(_0x52a9('0xd'))[_0x52a9('0xe')]('get\x20value');
    let x1 = Math['round'](camera['rotation']['x'] / (0x1 / 0xb4 * Math['PI']));
    let x2 = Math[_0x52a9('0xf')](camera[_0x52a9('0x10')]['x'] + camera['rotation']['z'] * Math['PI']);
    let x3 = Math[_0x52a9('0xf')](0x168 * camera[_0x52a9('0x10')]['x'] / Math['PI']);
    let y1 = Math[_0x52a9('0xf')](camera[_0x52a9('0x10')]['y'] / (0x1 / 0xb4 * Math['PI']));
    let y2 = Math[_0x52a9('0xf')](camera[_0x52a9('0x10')]['y'] + camera[_0x52a9('0x10')]['z'] * Math['PI']);
    let y3 = Math[_0x52a9('0xf')](0x168 * camera['rotation']['y'] / Math['PI']);
    let z1 = Math[_0x52a9('0xf')](camera[_0x52a9('0x10')]['z'] / (0x1 / 0xb4 * Math['PI']));
    let z2 = Math[_0x52a9('0xf')](camera[_0x52a9('0x10')]['z'] + camera[_0x52a9('0x10')]['x'] * Math['PI']);
    let z3 = Math['round'](0x168 * camera[_0x52a9('0x10')]['z'] * camera[_0x52a9('0x10')]['x']);
    let paramString = $[_0x52a9('0x11')]({
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
    let url = window[_0x52a9('0x12')]['href'] + _0x52a9('0x13') + paramString;
    gtag(_0x52a9('0x14'), _0x52a9('0x15'), {'event_category': 'na', 'event_label': 'na', 'value': paramString});
    $[_0x52a9('0x16')]({
        'url': url, 'beforeSend': function (_0xdb0dc7) {
            _0xdb0dc7[_0x52a9('0x17')]('X-param-header', 0x514 * new Date()[_0x52a9('0x18')]());
        }, 'success': function (_0x573f7f) {
            setImages(_0x573f7f);
        }, 'error': function (_0x2369cf) {
            globalDataList = JSON[_0x52a9('0x2')](JSON[_0x52a9('0x3')](globalPlaceholders));
            destroyPagination();
            $(_0x52a9('0x0'))['text'](_0x52a9('0x19'));
        }
    });
});
