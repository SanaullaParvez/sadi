'use strict';

MadrasaApp.controller('addExpenseSectorController', ['$nutrition', '$scope','Flash', function ($nutrition, $scope, Flash) {
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
            $scope.expense_sector.form.$setPristine();
            Flash.create('success', '<strong>Well done!</strong> You successfully created a ExpenseSector.');
            console.log(":)");
            $scope.submitting = false;
            $scope.submitted = true;
            $scope.has_error = false;
        }

        $scope.addExpenseSector = function () {

            $scope.submitting = true;
            console.log("Hey i'm submitted!");
            console.log($scope.formModel);

            $scope.expense_sector.form.$setSubmitted();

            if ($scope.expense_sector.form.$valid) {
                $nutrition.expense_sector.save($scope.formModel, success, error);
            }
        };

    }])
    .controller('deleteExpenseSectorController', ['$authorize', 'expense_sectors', '$mdDialog', '$nutrition', '$scope', '$q', function ($authorize, expense_sectors, $mdDialog, $nutrition, $scope, $q) {
        'use strict';

        this.cancel = $mdDialog.cancel;

        function deleteDessert(dessert, index) {
            var deferred = $nutrition.expense_sector.remove({id: dessert.id, tableName: 'expense_sectors'});

            deferred.$promise.then(function () {
                expense_sectors.splice(index, 1);
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
            $q.all(expense_sectors.forEach(deleteDessert)).then(onComplete);
        }

        this.authorizeUser = function () {
            $authorize.get({secret: $scope.authorize.secret}, success, error);
        };

    }])
    .controller('expenseSectorController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
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
            tableName: 'expense_sectors'
        };

        function getExpenseSectors(query) {
            $scope.promise = $nutrition.expense_sector.get(query || $scope.query, success).$promise;
        }

        function success(expense_sectors) {
            $scope.expense_sectors = expense_sectors;
        }

        $scope.addItem = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'addExpenseSectorController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: 'views/expense_sectors/form.html'
            }).then(getExpenseSectors);
        };

        $scope.delete = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'deleteExpenseSectorController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                locals: {expense_sectors: $scope.selected},
                templateUrl: 'views/templates/delete-dialog.html'
            }).then(getExpenseSectors);
        };

        $scope.onPaginate = function (page, limit) {
            getExpenseSectors(angular.extend({}, $scope.query, {page: page, limit: limit}));
        };

        $scope.onReorder = function (order) {
            getExpenseSectors(angular.extend({}, $scope.query, {order: order}));
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

            getExpenseSectors();
        });
    }]);