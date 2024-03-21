$(document).ready(function(){
    // 기본 - 화면의 가로, 세로 크기 / 스크롤 존재가 있다면 스크롤 크기 없으면 0
    basicStyle();
    $(window).resize(function(){
        basicStyle();
    })

    // 스타일 인덱스
    styleIdx();
})

// 기본 - 화면의 가로, 세로 크기 / 스크롤 존재가 있다면 스크롤 크기 없으면 0
function basicStyle(){
    $('body').css('--fullHeight', window.innerHeight + 'px');
    $('body').css('--fullWidth', window.innerWidth + 'px');
    let scrollWidth;
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        scrollWidth = '0'
    } else {
        scrollWidth = '17'
    }
    $('body').css('--scrollWidth', scrollWidth + 'px');
}

// 스타일 인덱스
function styleIdx(){
    $('[data-styleIdx]').each(function(){
        const childrenSelect = $(this).attr('data-styleIdx') ? $(this).children($(this).attr('data-styleIdx')) : $(this).children();
        $(this).css('--idxTotal', childrenSelect.length)
        childrenSelect.each(function(i){
            $(this).css('--styleIdx', i)
        })
    })
}