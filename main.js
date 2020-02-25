// 一个想法：一个一个移动
// setTimeout(function(){
//     $('.images>img:nth-child(1)').css({
//         transform: 'translateX(-100%)'
//     })
//     $('.images>img:nth-child(2)').css({
//         transform: 'translateX(-100%)'
//     })
//     $('.images>img:nth-child(1)').one('transitionend',function(e){
//         $(e.currentTarget).addClass('right').css({transform: 'none'})
//     })
// }, 3000)

// setTimeout(function(){
//     $('.images>img:nth-child(2)').css({
//         transform: 'translateX(-200%)'
//     })
//     $('.images>img:nth-child(3)').css({
//         transform: 'translateX(-100%)'
//     })
//     $('.images>img:nth-child(2)').one('transitioned',function(e){
//         $(e.currentTarget).addClass('right').css({transform: 'none'})
//     })
// }, 6000)

// setTimeout(function(){
//     $('.images>img:nth-child(3)').css({
//         transform: 'translateX(-200%)'
//     })
//     $('.images>img:nth-child(1)').css({
//         transform: 'translateX(-100%)'
//     })
//     $('.images>img:nth-child(3)').one('transitioned',function(e){
//         $(e.currentTarget).addClass('right').css({transform: 'none'})
//     })
// }, 9000)

// 我的想法
// 另一个想法，都使用绝对定位，这样各个图片之间就不存在位置联系，可以单独给各个图片设样式
// 需要一个容器装样式，是不变的样式，这个样式容器将布局分成三个部分，第一部分的left，第二部分是middle，第三部分是right
// 由于会出现覆盖的情况，我们需要给各个图片添加z-index，始终左边的z-index设成最小
cssArray = initialize($('.images>img'))
var length = $('.images>img').length
var n = 1
setInterval(function(){
    for(let i=0;i<length;i++){
        $('.images>img').eq((n+i)%(length)).removeClass("leave current enter").addClass(cssArray[i])
    }
    n += 1
},1000)

// 设置初始化状态以及生成样式列表，这个样式列表会在image之间进行传递型循环
function initialize(nodes){
    var cssArray = []
    for(let i=0;i<nodes.length;i++){
        nodes.eq(i).addClass('enter')
        cssArray[i] = 'enter'
    }
    nodes.eq(0).removeClass('enter').addClass('current')
    cssArray[0] = 'current'
    cssArray[nodes.length-1] = 'leave'
    return cssArray
}


// 老师的想法
// 有三种状态，是可以写成循环的，字符串里面
// $('.images >img:nth-child(1)').addClass('current')
// $('.images >img:nth-child(2)').addClass('enter')
// $('.images >img:nth-child(3)').addClass('enter')
// let n = 1
// setInterval(()=>{
//     $(`.images > img:nth-child(${x(n)})`).removeClass('current').addClass('leave')
//         .one('transitionend', (e)=>{
//             $(e.currentTarget).removeClass('leave').addClass('enter')
//         })
//     $(`.images > img:nth-child(${x(n+1)})`).removeClass('enter').addClass('current')
//     n += 1
// },3000)

// function x(n) {
//     if(n>3){
//         n = n%3
//         if(n===0){
//             n=3
//         }
//     }
//     return n
// }
