(function() {
  var homepage = angular.module('jadeless.admin.homepage', [
    'ui.router',
    'firebase'
  ]);

  homepage.config(
    [         '$stateProvider',
      function($stateProvider) {
        $stateProvider.state('admin.homepage',
          {
            title: 'Homepage',
            icon: 'icon-home',
            url: '/',
            templateUrl: '/admin/homepage/homepage.html',
            resolve: {
              homepage: ['$firebaseObject', 'FBREF', function($firebaseObject, FBREF) {
                return $firebaseObject(FBREF.child('homepage')).$loaded();
              }]
            },
            controller: 'AdminHomepageController'
          }
        );
      }
    ]
  );

  homepage.controller('AdminHomepageController',
    ['$rootScope', '$scope', 'homepage',
      function  ( $rootScope,   $scope,   homepage) {
        $scope.homepage = homepage;
        $scope.now = new Date();

        $scope.saveChanges = function() {
          if ($scope.auth.uid !== 'google:106068825523283570806') {
            alert('Only the admin can save changes.');
          }
          homepage.$save();
        };
      }
    ]
  );
})();
