var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework'], function (require, exports, aurelia_framework_1) {
    "use strict";
    var UIPage = (function () {
        function UIPage(element) {
            this.element = element;
            this.pageClass = '';
        }
        UIPage.prototype.created = function (owningView, myView) { };
        UIPage.prototype.bind = function (bindingContext, overrideContext) { };
        UIPage.prototype.attached = function () { };
        UIPage.prototype.detached = function () { };
        UIPage.prototype.unbind = function () { };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIPage.prototype, "pageClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIPage.prototype, "pageTitle", void 0);
        UIPage = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-page'),
            aurelia_framework_1.inlineView("\n<template class=\"ui-page\">\n  <div class=\"ui-page-title\" if.bind=\"pageTitle\" innerhtml.bind=\"pageTitle\"></div>\n  <div class=\"ui-page-body ${pageClass}\"><slot></slot></div>\n</template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIPage);
        return UIPage;
    }());
    exports.UIPage = UIPage;
    var UISection = (function () {
        function UISection(element) {
            this.element = element;
            if (element.hasAttribute('row-layout'))
                element.classList.add('row');
            else
                element.classList.add('column');
            if (element.hasAttribute('center'))
                element.classList.add('ui-align-center');
            if (element.hasAttribute('middle'))
                element.classList.add('ui-align-middle');
        }
        UISection.prototype.created = function (owningView, myView) { };
        UISection.prototype.bind = function (bindingContext, overrideContext) { };
        UISection.prototype.attached = function () { };
        UISection.prototype.detached = function () { };
        UISection.prototype.unbind = function () { };
        UISection = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-section'),
            aurelia_framework_1.inlineView("<template class=\"ui-section\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UISection);
        return UISection;
    }());
    exports.UISection = UISection;
    var UIContent = (function () {
        function UIContent(element) {
            this.element = element;
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
            if (element.hasAttribute('scroll'))
                element.classList.add('ui-scroll');
        }
        UIContent.prototype.created = function (owningView, myView) { };
        UIContent.prototype.bind = function (bindingContext, overrideContext) { };
        UIContent.prototype.attached = function () { };
        UIContent.prototype.detached = function () { };
        UIContent.prototype.unbind = function () { };
        UIContent = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-content'),
            aurelia_framework_1.inlineView("<template class=\"ui-content\"><slot></slot></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIContent);
        return UIContent;
    }());
    exports.UIContent = UIContent;
    var UIGlyph = (function () {
        function UIGlyph(element) {
            this.element = element;
            this.glyph = '';
        }
        UIGlyph.prototype.created = function (owningView, myView) { };
        UIGlyph.prototype.bind = function (bindingContext, overrideContext) { };
        UIGlyph.prototype.attached = function () { };
        UIGlyph.prototype.detached = function () { };
        UIGlyph.prototype.unbind = function () { };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIGlyph.prototype, "glyph", void 0);
        UIGlyph = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-glyph'),
            aurelia_framework_1.inlineView("<template class=\"ui-icon ${glyph}\"><svg><use tabindex=\"-1\" x=\"0\" y=\"0\" xlink:href=\"#${glyph}\"/></svg></template>"), 
            __metadata('design:paramtypes', [Element])
        ], UIGlyph);
        return UIGlyph;
    }());
    exports.UIGlyph = UIGlyph;
});
