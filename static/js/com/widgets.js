'use strict';

var WidgetManager,
    wm
;

WidgetManager = function () {
    this.enabledMap = {
        'editable': false
    };
};

$.extend(WidgetManager.prototype, EventEmitter.prototype, {
    enable: function (name, options) {
        var methodName = 'enable' + name.replace(/^./, function (c) { return c.toUpperCase() });

        options = options || {};

        options.bindEvents = !this.enabledMap[name];

        this[methodName](options);

        this.enabledMap[name] = true;
    },
    enableEditable: function (options) {
        var self = this,
            subSelectorForActivator = '[data-widget*=editable]',
            subSelectorForInput = subSelectorForActivator + ' + .form-control'
        ;

        if (!options.hasOwnProperty('selector')) {
            options.selector = document;
        }

        if (options.bindEvents) {
            $(document).on('click', subSelectorForActivator, function (e) {
                var $element = $(this),
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
            });

            $(document).on('keypress', subSelectorForInput, function (e) {
                // To be implemented
            });

            $(document).on('keyup', subSelectorForInput, function (e) {
                var $input = $(this),
                    $element = $input.prev(),
                    oldValue = $element.text(),
                    newValue = $.trim($input.val())
                ;

                switch (e.keyCode) {
                case 13:
                    $element.html(newValue);
                    $element.removeClass('active');
                    self.emit(
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
                    self.emit(
                        'editable.cancelled',
                        {
                            element:  $element,
                            oldValue: oldValue,
                            newValue: newValue
                        }
                    );

                    break;
                }
            });
        }

        $(options.selector)
            .find(subSelectorForActivator)
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
    }
});