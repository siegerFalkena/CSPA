'use strict';
angular.module('concentrator.component.selector', ['ui.bootstrap'])
    .directive('selector', selector)
    .service('selectorConfig', selectorConfig);

function selector() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            searchcategories: '='
        },
        templateUrl: '/shared/components/selector/partials/selector.html'
    }
}

function selectorConfig() {
    return {
        query: '',
        querycategory: '',
        filterchange: function() {
            this.search = {};
            this.search[this.querycategory.name] = this.query;
            console.log(this);
        },
        search: {},
        actionLabel: 'Search',
        go: function() {
            scope.itemlist =
                controllerCommons.resolvePromise(p_itemlist, scope.cb_setItems);
        },
        searchcategories: [{
            name: 'ID',
            shown: true
        }, {
            name: 'name',
            shown: true
        }, {
            name: 'price',
            shown: true
        }]
    };
}
