'use strict';
angular.module('concentrator.service.resource', ['ngResource'])
.config(['$resourceProvider', productResources])
.factory('resourceFactory', ['$resource' , '$log', '$q', function($resource, $log, $q){
    return new productAPI($resource, $log, $q);
}])
.service('productResources', ['$resource', '$log', productAPI])
.service('attributeResources', ['$resource', '$log', attributeAPI]);

function productResources($resourceProvider){
      $resourceProvider.defaults.stripTrailingSlashes = true;
}

function productAPI($resource, $log){
    var Product = $resource('/REST/product/:productID', 
                            {productID:'@id'}
                            ,{
                                //functions
                            });

    this.getClass = function(){
        return Product;
    };

    this.newProduct = function(name, description, price, callback){
        var product = new Product({
            name: name,
            description: description,
            price: price
        });
        product.name = name;
        product.price = price;
        product.description = description;
        product.$save();
        return product;
    };

};

function attributeAPI($resource, $log){
    var Attribute = $resource('/REST/attribute/:attributeID', 
                            {attributeID:attributeId}
                            ,{
                                //custom functions
                            });

    this.newAttribute = function(name, description, price){
        var attribute = new Attribute();
        attribute.name = name;
        attribute.price = price;
        attribute.description = description;
        attribute.$save();
        return attribute;
    };

    this.getAttribute = function(id){
        return Attribute.get({ id: id});
    };

};