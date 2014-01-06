'use strict';

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
    }
});
