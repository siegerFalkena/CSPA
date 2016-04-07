'use strict';
/**
 *  @author Sieger
 *  @module concentrator.auth
 */
angular.module('concentrator.auth')
    .service('auth', ['$http', '$log', '$cookies', '$window', authService])
    .controller('loginCtrl', ['$scope', '$cookies', '$log', '$window', 'auth', 'l10n', loginCtrl]);

/**
 * Returns authService singleton service
 *
 * @instance
 * @param      $http   $http  default angular http service
 * @param      $log   $log     default angular log service
 * @param      $cookies   $cookies default angular cookie management
 * @param      $window   $window  default angular window object
 * @inner
 */
function authService($http, $log, $cookies, $window) {

    this.doAuth = doAuthF;
    /**
     * authenticates user to server
     *
     * @method     doAuthF
     * @param      string    username  
     * @param      string    password  
     * @param      Function  cb_result(boolean) callback function
     * @memberof   authService
     */
    function doAuthF(username, password, cb_result) {
        function cb_success(response) {
            $log.info("authentication: " + response.status + "\t" + response.statusText);
            cb_result(true);
        }

        function cb_failure(response) {
            $log.info("authentication: " + response.status + "\t" + response.statusText);
            cb_result(false);
        }

        $http.defaults.headers.common.username = username;
        $http.defaults.headers.common.password = password;
        $http.defaults.headers.common.remember = true;
        var temp = $http.post('/auth/auth', '').then(cb_success, cb_failure);
        return temp;
    };


    this.isAuthed = isAuthedF ;
    /**
     * Determine if authed.
     *
     * @method     isAuthed
     * @return     boolean  true if all relevant authentication methods are set
     * @memberof authService
     */
    function isAuthedF() {
        var authToken = $cookies.get('authToken');
        var user = $cookies.get('user');
        var role = $cookies.get('role');
        if (authToken == undefined || user == undefined || role == undefined) {
            return false;
        } else {
            return true
        }
    };


    this.logout = logoutF;
    /**
     * removes all authentication related information from storage
     *
     * @method     logout
     * @memberof authService
     */
    function logoutF() {
        $cookies.remove("user");
        $cookies.remove("role");
        $cookies.remove("authToken");
        $window.location.href = "/"
    };

};





/**
 * controller for login screen
 *
 * @method     loginCtrl
 * @param      {$scope}  $scope    
 * @param      {$cookies}  $cookies  
 * @param      {$log}  $log      
 * @param      {$window}  $window   window
 * @param      {concentrator.auth}  auth      auth service
 * @param      {concentrator.l10n}  l10n  locale service
 */
function loginCtrl($scope, $cookies, $log, $window, auth, l10n) {

    $scope.client = {
        name: 'Jumbo',
        url: '/',
        imgSrc: 'assets/img/circle_gradient.png'
    };

    $scope.brand = {
        name: 'Concentrator',
        url: '/',
        imgSrc: 'assets/img/diract_logo.png'
    };

    $scope.scope = function() {
        $log.info($scope);
    }

    $scope.login = function() {
        function cb_result(b_success) {
            $window.location.href = "/"
        };
        var temp = auth.doAuth($scope.username, $scope.password, cb_result);
    };

    $scope.messages = []

    $scope.tempmsg = {
        "class": "list-group-item-danger",
        "info": "good info, just debug"
    };

    $scope.l10n = l10n.init($scope, function() {});
    $log.info($scope);
}
