'use strict';

MadrasaApp.controller('addStoneController', ['$nutrition', '$scope','Flash', function ($nutrition, $scope, Flash) {
        'use strict';

        $scope.formModel = {};
        $scope.submitting = false;
        $scope.submitted = false;
        $scope.has_error = false;
        function error(dessert) {
            console.log(":(");
            console.log(dessert);
            $scope.submitting = false;
            $scope.submitted = false;
            $scope.has_error = true;
        }

        function success() {
            $scope.formModel = {};
            $scope.stone.form.$setPristine();
            Flash.create('success', '<strong>Well done!</strong> You successfully created a Stone.');
            console.log(":)");
            $scope.submitting = false;
            $scope.submitted = true;
            $scope.has_error = false;
        }

        $scope.addStone = function () {

            $scope.submitting = true;
            console.log("Hey i'm submitted!");
            console.log($scope.formModel);

            $scope.stone.form.$setSubmitted();

            if ($scope.stone.form.$valid) {
                $nutrition.stone.save($scope.formModel, success, error);
            }
        };

    }])
    .controller('deleteStoneController', ['$authorize', 'stones', '$mdDialog', '$nutrition', '$scope', '$q', function ($authorize, stones, $mdDialog, $nutrition, $scope, $q) {
        'use strict';

        this.cancel = $mdDialog.cancel;

        function deleteDessert(dessert, index) {
            var deferred = $nutrition.stone.remove({id: dessert.id, tableName: 'stones'});

            deferred.$promise.then(function () {
                stones.splice(index, 1);
            });

            return deferred.$promise;
        }

        function onComplete() {
            $mdDialog.hide();
        }

        function error() {
            $scope.error = 'Invalid secret.';
        }

        function success() {
            $q.all(stones.forEach(deleteDessert)).then(onComplete);
        }

        this.authorizeUser = function () {
            $authorize.get({secret: $scope.authorize.secret}, success, error);
        };

    }])
    .controller('stoneController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
        'use strict';

        var bookmark;

        $scope.selected = [];

        $scope.filter = {
            options: {
                debounce: 500
            }
        };

        $scope.query = {
            filter: '',
            limit: '',
            order: 'id',
            page: 1,
            tableName: 'stones'
        };

        function getStones(query) {
            $scope.promise = $nutrition.stone.get(query || $scope.query, success).$promise;
        }

        function success(stones) {
            $scope.stones = stones;
        }

        $scope.addItem = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'addStoneController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: 'views/stone/form.html'
            }).then(getStones);
        };

        $scope.delete = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'deleteStoneController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                locals: {stones: $scope.selected},
                templateUrl: 'views/templates/delete-dialog.html'
            }).then(getStones);
        };

        $scope.onPaginate = function (page, limit) {
            getStones(angular.extend({}, $scope.query, {page: page, limit: limit}));
        };

        $scope.onReorder = function (order) {
            getStones(angular.extend({}, $scope.query, {order: order}));
        };

        $scope.removeFilter = function () {
            $scope.filter.show = false;
            $scope.query.filter = '';

            if ($scope.filter.form.$dirty) {
                $scope.filter.form.$setPristine();
            }
        };

        $scope.$watch('query.filter', function (newValue, oldValue) {
            if (!oldValue) {
                bookmark = $scope.query.page;
            }

            if (newValue !== oldValue) {
                $scope.query.page = 1;
            }

            if (!newValue) {
                $scope.query.page = bookmark;
            }

            getStones();
        });
    }]);