'use strict';
describe('concentrator.service.resource', function() {
    var productResources;
    beforeEach(function(){
        module('concentrator.service.rest');
    });

    beforeEach(inject(function(_productResources_){
        productResources = _productResources_;
    }));


    it('should return true', function() {
        console.log(productResources);
    });

})