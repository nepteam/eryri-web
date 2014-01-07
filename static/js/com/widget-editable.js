'use strict';

/*!
 * Melodic JavaScript Library v1.0a
 * http://github.com/shiroyuki/melodic-js
 *
 * Copyright 2014 Juti Noppornpitak
 * Released under the MIT license
 * See https://github.com/shiroyuki/melodic-js/blob/master/LICENSE
 */

/**
 * Content-editable Widget
 *
 * Immitate the behaviour of HTML5 content editable feature.
 */
var EditableWidget = function (options) {
    options = options || {};

    this.subSelectorForActivator = '[data-widget*=editable]';
    this.subSelectorForInput     = this.subSelectorForActivator + ' + .form-control';
};

$.extend(EditableWidget.prototype, EventEmitter.prototype);

EditableWidget.prototype.onActivatorClick = function (e) {
    var $element = $(e.currentTarget),
        $input = $element.next(),
        style = {
            'font-size': $element.css('font-size'),
            'margin-top': $element.css('margin-top'),
            'margin-left': $element.css('margin-left'),
            'margin-right': $element.css('margin-right'),
            'margin-bottom': $element.css('margin-bottom')
        }
    ;

    e.preventDefault();
    $element.addClass('active');
    $input
        .css(style)
        .val($element.text())
        .focus();
};

EditableWidget.prototype.onPressUpdateOrResetData = function (e) {
    var $input = $(e.currentTarget),
        $element = $input.prev(),
        oldValue = $element.text(),
        newValue = $.trim($input.val())
    ;

    switch (e.keyCode) {
    case 13:
        $element.html(newValue);
        $element.removeClass('active');
        this.emit(
            'editable.updated',
            {
                element:  $element,
                oldValue: oldValue,
                newValue: newValue
            }
        );

        break;
    case 27:
        $input.val(oldValue);
        $element.removeClass('active');
        this.emit(
            'editable.cancelled',
            {
                element:  $element,
                oldValue: oldValue,
                newValue: newValue
            }
        );

        break;
    }
};
EditableWidget.prototype.initialize = function (options) {
    options = options || {};

    $(document).on('click', this.subSelectorForActivator, $.proxy(this.onActivatorClick, this));
    $(document).on('keyup', this.subSelectorForInput, $.proxy(this.onPressUpdateOrResetData, this));
};

EditableWidget.prototype.apply = function (options) {
    options = options || {};

    if (!options.hasOwnProperty('selector')) {
        options.selector = document;
    }

    $(options.selector)
        .find(this.subSelectorForActivator)
        .each(function (index) {
            var $element = $(this),
                name = this.nodeName.toLowerCase(),
                placeholder = $element.data('placeholder')
            ;

            if (name.match(/^(h\d|span)$/)) {
                $element.after('<input type="text" class="form-control" data-element="' + name + '" placeholder="' + placeholder + '"/>');
                return;
            } else if (name.match(/^(p|div|addr)$/)) {
                $element.after('<textarea class="form-control" data-element="' + name + '" placeholder="' + placeholder + '"></textarea>');
            }
        });
};