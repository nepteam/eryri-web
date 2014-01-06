'use strict';

var Measure = function (id, concurrentMeasure) {
    this.id = id;
    this.concurrentMeasure = concurrentMeasure || 1;
    this.element = $('.sheet');
    this.width   = parseInt(this.element.innerWidth(), 10);
    this.height  = parseInt(
        this.lineHeight
        * this.lineCountPerConcurrentMeasure
        * this.concurrentMeasure,
        10
    );
    this.renderer = new Raphael(this.element[0], this.width, this.height);
};

$.extend(Measure.prototype, EventEmitter.prototype, {
    marginTop: 50, // trick to get a sharp line
    marginLeft: 1, // trick to get a sharp line
    marginRight: 1, // trick to get a sharp line
    marginBottom: 50,
    lineHeight: 10,
    lineCountPerConcurrentMeasure: 5,
    drawBackground: function () {
        var circle = this.renderer.circle(50, 40, 10);
        circle.attr("fill", "#f00");
    }
});