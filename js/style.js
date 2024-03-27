$(document).ready(function(){
    // 기본 - 화면의 가로, 세로 크기 / 스크롤 존재가 있다면 스크롤 크기 없으면 0
    basicStyle();
    $(window).resize(function(){
        basicStyle();
    })

    // 스타일 인덱스
    styleIdx();

    // 모바일 메뉴
    $('header > button').click(function(){
        $('header nav').addClass('active')
    })
    $('header nav button').click(function(){
        $('header nav').removeClass('active')
    })

    // 풀페이지
    $('.fullBox').length && fullPage()
    
    // 공유하기 - 링크 복사 
    $('#linkCopy').length && linkCopy()
    
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


// 풀 페이지
function fullPage(){
   /*  document.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, { passive: false }); */
    let fullElement = []
    let fullElementHeight = []
    let fullElementTop = []
    const touchEvent = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
    }

    currentValue()

    let moveValue;
    let selectElement;
    let selectIdx = 0;

    $(window).resize(function(){
        currentValue()
        $('.fullBox').css('--moveValue', `${fullElementTop[selectIdx] * -1}px`)
    })

    function currentValue(){
        fullElement = []
        fullElementHeight = []
        fullElementTop = []
        $('.fullBox > *').each(function(){
            fullElement.push($(this))
            fullElementHeight.push($(this).outerHeight())
            fullElementTop.push(fullElementHeight.reduce((prev, current)=> prev + current))
        })
        fullElementTop = fullElementTop.map((value) => value - window.innerHeight)
    }



    // $('.mainPage').css('--duration', `${0.8}s`)

    $('.fullBox').on('mousewheel', function(e){
        const delta = e.originalEvent.wheelDelta;
        fullAnimate(delta)
    })

    $('.fullBox').on('touchstart', function(e){
        touchEvent['startX'] = e.touches[0].clientX
        touchEvent['startY'] = e.touches[0].clientY
    })
    $('.fullBox').on('touchend', function(e){
        touchEvent['endX'] = e.changedTouches[0].clientX
        touchEvent['endY'] = e.changedTouches[0].clientY
        if(Math.abs(touchEvent['startX'] - touchEvent['endX']) - Math.abs(touchEvent['startY'] - touchEvent['endY']) < 0){
            fullAnimate(touchEvent['endY'] - touchEvent['startY'])
        }
    })

    function fullAnimate(delta){
        const curruntTop = Math.abs($('.fullBox').css("transform").split(',')[5].split(')')[0])
        if(delta < 0){
            moveValue = fullElementTop.find((value)=>value > curruntTop) ?? moveValue
        }else{
            moveValue = fullElementTop.reverse().find((value)=>value < curruntTop) ?? moveValue
            fullElementTop.reverse();
        }
        selectIdx = fullElementTop.indexOf(moveValue);
        selectElement = fullElement[selectIdx];
        if(selectElement){
            if(selectElement.attr('data-full') !== undefined){
                if(selectElement.attr('data-full')){
                    $('.mainPage').addClass('white');
                }else{
                    $('.mainPage').removeClass('white');
                }
                $('.mainPage').css('--sideValue', `0`)
                $('.full-numb').html(`0${selectIdx + 1}`)
            }else{
                $('.mainPage').css('--sideValue', `-${selectElement.outerHeight()}px`)
            }
            $('.mainPage').css('--duration', `${0.8 / window.innerHeight * selectElement.outerHeight()}s`)
            $('.fullBox').css('--moveValue', `${moveValue * -1}px`)
        }

        if(selectIdx){
            $('body').addClass('reflash')
        }else{
            $('body').removeClass('reflash')
        }


        
    }


    $('.full-pagination button').click(function(){
        let delta = 120;
        if($(this).index()){
            delta *= -1
        }
        fullAnimate(delta)
    })
}


// 공유하기 - 링크 복사 
function linkCopy(){
    $('#linkCopy').click(function(){
        // 현재 페이지의 URL 가져오기
        var pageLink = window.location.href;

        // 임시 input 엘리먼트를 생성하여 URL 복사
        var tempInput = document.createElement("input");
        tempInput.value = pageLink;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        $('.popup').addClass('active');
    })
    
    $('.popup, .popup div button').click(function(){
        $('.popup').removeClass('active');
    })

    $('.popup div').click(function(e){
        e.stopPropagation();
    })
}