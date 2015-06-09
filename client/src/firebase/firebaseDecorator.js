(function() {
  var firebaseDecorator = angular.module('jadeless.firebaseDecorator', [
    'firebase'
  ]);

  firebaseDecorator.config(
    [         '$provide',
      function($provide) {
        $provide.decorator('$firebase',
          [         '$delegate', '$q',
            function($delegate,   $q) {
              var FBREF;
              var deferredInit;

              function onAuthHandler() {
                deferredInit.resolve(FBREF);
              }

              $delegate.getRef = function(url) {
                deferredInit = $q.defer();
                FBREF = new Firebase(url);
                FBREF.onAuth(onAuthHandler);
                FBREF.authWithProvider = authWithProvider;
                return deferredInit.promise;
              };

              function authWithProvider(provider, onComplete) {
                if (['facebook', 'google'].indexOf(provider) === -1) {
                  onComplete('Error: Invalid auth provider.', null);
                  return;
                }
                FBREF.authWithOAuthPopup(provider, function(error, authData) {
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

              return $delegate;
            }
          ]
        );
      }
    ]
  );
})();