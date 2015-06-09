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
            controller: ['$scope', '$timeout', '$firebase', 'FBREF',
              function  ( $scope,   $timeout,   $firebase,  FBREF) {
                $scope.auth = FBREF.getAuth();

                FBREF.onAuth(function(auth) {
                  $scope.auth = auth;
                  $timeout(function() {
                    $scope.$digest();
                  });
                });

                $scope.login = function() {
                  $firebase.authWithProvider('google', function(error, auth) {
                    if (error) {
                      alert(error);
                    }
                  });
                };

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

  admin.config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider.state('admin.index',
          {
            url: '/',
            templateUrl: '/admin/admin.html',
            controller: ['$rootScope', '$scope', '$timeout', 'FBREF',
              function  ( $rootScope,   $scope,   $timeout,   FBREF) {
                $scope.now = new Date();
              }
            ]
          }
        );
      }
    ]
  );
})();