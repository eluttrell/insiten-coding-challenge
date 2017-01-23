const app = angular.module('insiten', ['ui.router', 'ngCookies'])
    .run(function($rootScope) {
        $rootScope.targets = [{
            name: 'Ernst & Young',
            status: 'Approved',
            info: 'EY is a multinational professional services firm headquartered in London, United Kingdom. EY is one of the largest professional srevices firms in the world and is one of the "Big Four" accounting firms.',
            contacts: [{
                name: 'Mark Weinberger'
            }],
            financial: '$29.6 Billion'
        }, {
            name: 'Young & Ernst',
            status: 'Pending Approval',
            info: 'A small company.',
            contacts: [{
                name: 'Wein Markberger'
            }, {
                name: 'James Earl Jones'
            }],
            financial: '$12.35'
        }, {
            name: 'Ernst & Young',
            status: 'Approved',
            info: 'EY is a multinational professional services firm headquartered in London, United Kingdom. EY is one of the largest professional srevices firms in the world and is one of the "Big Four" accounting firms.',
            contacts: [{
                name: 'Mark Weinberger'
            }],
            financial: '$29.6 Billion'
        }, {
            name: 'Young & Ernst',
            status: 'Pending Approval',
            info: 'A small company.',
            contacts: [{
                name: 'Wein Markberger'
            }, {
                name: 'James Earl Jones'
            }],
            financial: '$12.35'
        }];
    });

// ========================
// SERVICE
// ========================



// ========================
// CONTROLLERS
// ========================

app.controller('homeController', function($scope, $state, $cookies, $rootScope) {

    console.log('Homepage rootscope:', $rootScope.targets);

    $scope.editButton = function(index) {
        console.log(index);
        $cookies.putObject('index', index);
        $state.go('edit');
    };

    $scope.addEntry = function() {
        $state.go('add');
    }

    $scope.deleteEntry = function(index) {
        let x = confirm('Are you sure?')
        if (x == true) {
          $rootScope.targets.splice(index, 1);
        }
    };

});

app.controller('editController', function($scope, $state, $cookies, $rootScope) {
    let editedEntry = {};
    $scope.contacts = [{
        name: ''
    }];

    editedEntry.index = $cookies.getObject('index');

    // console.log(editedEntry.index);
    // console.log('This should be undefined', $cookies.getObject('index'));

    let oldData = $rootScope.targets[editedEntry.index];

    $scope.name = oldData.name;
    $scope.status = oldData.status;
    $scope.companyRevenue = oldData.financial;
    $scope.companyInfo = oldData.info;
    $scope.contacts = oldData.contacts;

    $scope.statuses = [
        'Researching',
        'Pending Approval',
        'Approved',
        'Declined'
    ];

    $scope.addContact = function() {
        $scope.contacts.push({
            name: ''
        });
    }

    $scope.removeContact = function(index) {
        $scope.contacts.splice(index, 1);
    };

    $scope.statusChanged = function(status) {
        // let x = status;
        // console.log(x);
        editedEntry.status = status;
        console.log('editedEntry:', editedEntry);
    };

    $scope.saveEdit = function() {
        editedEntry.name = $scope.name;
        editedEntry.info = $scope.companyInfo;
        editedEntry.revenue = $scope.companyRevenue;

        oldData.name = editedEntry.name;
        oldData.info = editedEntry.info;
        oldData.financial = editedEntry.revenue;
        oldData.contacts = $scope.contacts

        console.log('editedEntry:', editedEntry);
        console.log('oldData:', oldData);
        console.log('Rootscope:', $rootScope.targets);
        $cookies.remove('index');
        $state.go('home');
    };

    console.log('editedEntry:', editedEntry);

});

app.controller('addController', function($scope, $state, $rootScope, $cookies) {

  let location = $rootScope.targets.length - 1;
  // let newData = $rootScope.targets[location];
  let newData = {name: ''};
  $scope.contacts = [{name: ''}];

  $scope.statuses = [
      'Researching',
      'Pending Approval',
      'Approved',
      'Declined'
  ];

  $scope.addContact = function() {
      $scope.contacts.push({
          name: ''
      });
  }

  $scope.removeContact = function(index) {
      $scope.contacts.splice(index, 1);
  };

  $scope.statusChanged = function(status) {
      newData.status = status;
      console.log('newData:', newData);
  };

  $scope.saveEdit = function() {
      newData.name = $scope.name;
      newData.info = $scope.companyInfo;
      newData.financial = $scope.companyRevenue;
      newData.contacts = $scope.contacts;

      $rootScope.targets.push(newData);

      console.log('newData:', newData);
      console.log('Rootscope:', $rootScope.targets);
      $state.go('home');
  };

});

// ========================
// STATES
// ========================

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state({
            name: 'home',
            url: '/',
            templateUrl: '/templates/home.html',
            controller: 'homeController'
        })
        .state({
            name: 'edit',
            url: '/edit',
            templateUrl: '/templates/edit.html',
            controller: 'editController'
        })
        .state({
            name: 'add',
            url: '/add',
            templateUrl: '/templates/add.html',
            controller: 'addController'
        })

    $urlRouterProvider.otherwise('/');
});
