'use strict';
angular.module('concentrator.service.login', [
	'ngCookies'
	]).service('loginService', ['$cookies', '$http'  loginService] );

function loginService($cookies){
	this.valid = function validF(item){
		if(item != undefined && item.length > 8){
			return true;
		}
		return false;
	};

	this.login = function loginF(username, password, persist){
		var auth = $cookies.get('authToken');
		if(auth.username != undefined || auth.password != undefined){
			//reauth
		}
	}
}