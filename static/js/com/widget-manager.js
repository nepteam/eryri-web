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
 * Widget Manager
 *
 * This class is a prototype to act as a proxy to the actual widgets/features.
 */
var WidgetManager = function () {
    this.widgetMap = {
        'editable': null
    };
};

$.extend(WidgetManager.prototype, EventEmitter.prototype, {
    use: function (name, options) {
        this.enable(name, options);
    },
    enable: function (name, options) {
        var className = name.replace(/^./, function (c) { return c.toUpperCase() }) + 'Widget';

        if (!window.hasOwnProperty(className)) {
            this.raise('melodicjs.widget_manager.enable.error');
        }

        if ( ! this.widgetMap[name]) {
            this.widgetMap[name] = new window[className](options);
            this.widgetMap[name].initialize(options);
        }
    },
    get: function (name) {
        if ( ! this.widgetMap[name]) {
            this.raise('melodicjs.widget_manager.get.error');
        }

        return this.widgetMap[name];
    }
});