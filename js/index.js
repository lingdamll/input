/**
 * Created by Administrator on 2017/7/16.
 */
$(function () {
    //第一页滚动效果
    sectionOneBgc();
    //分页滚动
    $('#page').fullpage({
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
        //menu: '#menu1',
        verticalCentered: true,
        //sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        scrollBar: true,
        afterLoad: function (anchorLink, index) {
            //
            if (index >= 2) {
                console.log(index);
                $("#page .navbar-nav li").removeClass('active');
                $($("#page .navbar-nav li").get(index - 2)).addClass('active');
                $(".sectionTwo .navbar").addClass('navbar-fixed-top');
                if (index == 5) {
                    //当是第五页并且,发生伸缩的时候就重新绘制一遍
                    $(window).resize(function () {
                        //console.log('1324');
                        var width = document.querySelector('#dv').offsetWidth;
                        //var width1 = document.querySelector('#dv1').offsetWidth;
                        var stage = new Konva.Stage({
                            container: 'dv',
                            width: width,
                            height: 234
                        });
                        var stage1 = new Konva.Stage({
                            container: 'dv1',
                            width: width,
                            height: 234
                        });
                        var layer = new Konva.Layer();
                        var layer1 = new Konva.Layer();

                        stage.add(layer);
                        stage1.add(layer1);

                        data = [
                            {
                                layer: layer,
                                x: width / 4,
                                y: 117,
                                innerRadius: 60,
                                outerRadius: 70,
                                //圆环背景颜色
                                bgfill: '#ddd',
                                //圆环的颜色
                                fill: '#2c3e50',
                                //圆环的起始角度
                                rotation: -90,
                                //圆环内文字
                                text: '90%',
                                outText: 'HTML5',
                                //圆环的终止的角度
                                endAngle: 324,

                            },
                            {
                                layer: layer,
                                x: width / 4 + width / 2,
                                y: 117,
                                innerRadius: 60,
                                outerRadius: 70,
                                //圆环背景颜色
                                bgfill: '#ddd',
                                //圆环的颜色
                                fill: '#2c3e50',
                                //圆环的起始角度
                                rotation: -90,
                                //圆环内文字
                                text: '90%',
                                outText: 'CSS3',

                                //圆环的终止的角度
                                endAngle: 324,

                            },
                            {
                                layer: layer1,
                                x: width / 4,
                                y: 117,
                                innerRadius: 60,
                                outerRadius: 70,
                                //圆环背景颜色
                                bgfill: '#ddd',
                                //圆环的颜色
                                fill: '#2c3e50',
                                //圆环的起始角度
                                rotation: -90,
                                //圆环内文字
                                text: '85%',
                                outText: 'JQ',

                                //圆环的终止的角度
                                endAngle: 306,

                            },
                            {
                                layer: layer1,
                                x: width / 4 + width / 2,
                                y: 117,
                                innerRadius: 60,
                                outerRadius: 70,
                                //圆环背景颜色
                                bgfill: '#ddd',
                                //圆环的颜色
                                fill: '#2c3e50',
                                //圆环的起始角度
                                rotation: -90,
                                //圆环内文字
                                text: '80%',
                                outText: 'JS',
                                //圆环的终止的角度
                                endAngle: 288,

                            }
                        ];
                        data.forEach(function (e) {
                            jszwCanvas(e);
                        });

                    }).trigger('resize');
                }
            } else {
                $(".sectionTwo .navbar").removeClass('navbar-fixed-top');
            }
            //console.log(index);
        }
    });
});


function sectionOneBgc() {
    var bgc = $("#page .sectionOne .sectionOneBox");
    bgc.css('backgroundImage', 'url(./images/bg1.jpg)').addClass('scale');
    //添加动画完成的事件监听
    bgc.bind('animationend', function () {
        bgc.removeClass('scale');
    })
    //初始化背景,并定时更换背景
    var timerid = setInterval(function () {
        //添加类的样式是有问题的,还有一个方法是直接使用js设置属性,而不是一个c3的动画
        var index = Math.ceil(Math.random() * 3);
        bgc.css('backgroundImage', 'url(./images/bg' + index + '.jpg)').addClass('scale');
    }, 3000)
}
/*
 * 需要抽取的参数
 * 容器id
 * 坐标值,
 * 内外半径
 * 背景圆环填充颜色
 * 动画 颜色
 *
 * */
function jszwCanvas(data) {
    /*背景圆环*/
    var ring = new Konva.Ring({
        x: data.x,
        y: data.y,
        innerRadius: data.innerRadius,
        outerRadius: data.outerRadius,
        fill: data.bgfill
    });

    //创建动画
    var arc = new Konva.Arc({
        x: data.x,
        y: data.y,
        innerRadius: data.innerRadius,
        outerRadius: data.outerRadius,
        //stroke: '#2c3e50',
        fill: data.fill,
        rotation: data.rotation
    });

    //绘制文字
    var innertext = new Konva.Text({
        x: data.x,
        y: data.y,
        text: data.text,
        fontSize: 30,
        offsetX: 25,
        offsetY: 10,
    });
    var outText = new Konva.Text({
        x: data.x,
        y: data.y + data.outerRadius + 40,
        text: data.outText,
        fontSize: 16,
        offsetX: 10,
        offsetY: 10,
        fill: '#E87E04',
    });
    //绘制文字背景
    var circle = new Konva.Circle({
        x: data.x,
        y: data.y,
        radius: data.innerRadius,
        fill: '#fff'
    })
    //添加到图层
    data.layer.add(ring);
    data.layer.add(arc);
    data.layer.add(circle);
    data.layer.add(innertext);
    data.layer.add(outText);
    arc.to({
        angle: data.endAngle,
        duration: 3,
        fill: data.fill
    })
    data.layer.draw();
}
/*动画需要接解决的bug
 * 不应该有滚动条
 * 字体也透明的解决
 * 图片切换的空白图
 * */