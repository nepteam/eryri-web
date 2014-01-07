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
 * Event Emitter
 *
 * This is similar to EventEmitter from Node.js by utilizing CustomEvent
 * available at least by the modern javascript engine.
 */
var EventEmitter = function () {};

$.extend(EventEmitter.prototype, {
    _useTimestamp: false,
    _lastKnownIdentifier: 0,
    EventEmitter: function (identifier) {
        this.uniqueIdentifier = identifier || null;
    },
    getEventUniqueIdentifier: function () {
        if (typeof this.uniqueIdentifier === undefined) {
            this.uniqueIdentifier = this._useTimestamp
                ? (new Date()).getTime()
                : ++this._lastKnownIdentifier;
        }
    },
    getActualEventType: function (eventType) {
        return [this.getEventUniqueIdentifier(), eventType].join('.');
    },
    addEventListener: function (type, listener) {
        var actualEventType = this.getActualEventType(type);

        document.addEventListener(actualEventType, listener);
    },
    on: function (type, listener) {
        this.addEventListener(type, listener);
    },
    dispatchEvent: function (type, data) {
        var actualEventType = this.getActualEventType(type);

        data = data || {};

        var e = new CustomEvent(
            actualEventType,
            {
                origin: this,
                userData: data
            }
        );

        document.dispatchEvent(e);
    },
    emit: function (type, data) {
        this.dispatchEvent(type, data);
    },
    raise: function (message) {
        throw message;
    }
});
