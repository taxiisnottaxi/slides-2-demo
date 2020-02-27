let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
$slides.css({transform: 'translateX(-400px)'})
bindEvents()

// 上一页下一页
$('#next').on('click', function(){
    goToSlide(current+1)
})
$('#previous').on('click', function(){
    goToSlide(current-1)
})

// 自动播放
let timer = setInterval(function(){
    goToSlide(current + 1)
},2000)
$('.container').on('mouseenter', function(){
    window.clearInterval(timer)
}).on('mouseleave', function(){
    timer = setInterval(function(){
        goToSlide(current + 1)
    },2000)
})

function bindEvents(){
    $('#buttonWrapper').on('click', 'button', function(e){
        // 这边这种监听方式使用的是监听的是click事件，对象是buttonWrapper，但是点击buttonWrapper没用，点击它里面的button才有用
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlide(index)
    })
}

// 这个函数比较重要，我们拥有了去到任何一张图片的可能
function goToSlide(index){
    if(index>$buttons.length - 1){
        index = 0
    }else if(index < 0){
        index = $buttons.length - 1
    }
    if(current === $buttons.length - 1 && index === 0){
        // 最后一张到第一张
        $slides.css({transform: `translateX(${-($buttons.length + 1) *400}px)`})
            .one('transitionend', function(){
                $slides.hide().offset()
                $slides.css({transform: `translateX(${-(index+1)*400}px)`}).show()
            })
    }else if(current === 0 && index === $buttons.length - 1){
        // 第一张到最后一张
        $slides.css({transform: 'translateX(0px)'})
            .one('transitionend', function(){
                $slides.hide().offset()
                $slides.css({transform: `translateX(${-(index+1)*400}px)`}).show()
            })
    }else{
        $slides.css({transform: `translateX(${- (index+1) *400}px)`})
    }
    current = index
}

function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length - 1).clone(true)

    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}