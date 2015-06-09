(function() {
  var admin = angular.module('jadeless.admin', [
    'ui.router',
    'firebase',
    'jadeless.firebaseDecorator'
  ]);

  admin.run(
    [         '$rootScope',
      function($rootScope) {
      }
    ]
  );

  admin.config(
    [         '$urlRouterProvider', '$stateProvider',
      function($urlRouterProvider,   $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('admin',
          {
            abstract: true,
            template: '<ui-view/>',
            resolve: {
              FBREF: ['$firebase', function($firebase) {
                var url = 'https://jadeless-dot-com.firebaseio.com/';
                return $firebase.getRef(url);
              }],
              auth: ['FBREF', function(FBREF) {
                return FBREF.getAuth();
              }]
            },
            controller: ['$firebase', 'FBREF', 'auth',
              function  ( $firebase,   FBREF,   auth) {
                if (!auth) {
                  FBREF.authWithOAuthPopup('google', function(error, authData) {
                    if (error && error.code === 'TRANSPORT_UNAVAILABLE') {
                      sessionStorage.authenticatingWithRedirect = true;
                      FBREF.authWithOAuthRedirect(provider, function(error) {
                        onComplete(error, null);
                      });
                    } else {
                      onComplete(error, authData);
                    }
                  });
                }
              }
            ]
          }
        );
      }
    ]
  );

  admin.config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider.state('admin.index',
          {
            url: '/',
            template: 'now = {{ now }}<br>auth = {{ auth }}<br><a ng-click="logout()">Logout</a>',
            controller: ['$rootScope', '$scope', 'FBREF',
              function  ( $rootScope,   $scope,   FBREF) {
                $scope.now = new Date();
                $scope.auth = FBREF.getAuth();
                $scope.logout = function() {
                  FBREF.unauth();
                };
              }
            ]
          }
        );
      }
    ]
  );
})();