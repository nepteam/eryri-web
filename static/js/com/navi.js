$(function () {
    var $primaryNavi = $('nav.primary');

    $primaryNavi.on('click', '.logo', function (e) {
        e.preventDefault();

        $primaryNavi.addClass('activated');
    });

    $primaryNavi.on('click', '.deactivator', function (e) {
        e.preventDefault();

        $primaryNavi.removeClass('activated');
    });
});