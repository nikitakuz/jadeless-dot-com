(function() {
  var admin = angular.module('jadeless.admin', [
    'ui.router',
    'firebase',
    'jadeless.firebaseDecorator',
    'jadeless.admin.homepage'
  ]);

  admin.run(
    [         '$rootScope', '$state',
      function($rootScope,   $state) {
        $rootScope.$state = $state;
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
            templateUrl: '/admin/admin.html',
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
})();