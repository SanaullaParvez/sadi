'use strict';

MadrasaApp.controller('addExpenseController', ['$nutrition', '$scope','Flash', function ($nutrition, $scope, Flash) {
        'use strict';

        $scope.formModel = {};
        $scope.submitting = false;
        $scope.submitted = false;
        $scope.has_error = false;

        $nutrition.buyer.get({
            order: 'id',
            tableName: 'buyers'
        }, function (buyers) {
            $scope.buyers = buyers;
        }).$promise;

        $nutrition.expense_sector.get({
            order: 'id',
            tableName: 'expense_sectors'
        }, function (expense_sectors) {
            $scope.expense_sectors = expense_sectors;
        }).$promise;

        function error(dessert) {
            console.log(":(");
            console.log(dessert);
            $scope.submitting = false;
            $scope.submitted = false;
            $scope.has_error = true;
        }

        function success() {
            $scope.formModel = {};
            $scope.expense.form.$setPristine();
            Flash.create('success', '<strong>Well done!</strong> You successfully created a Expense.');
            console.log(":)");
            $scope.submitting = false;
            $scope.submitted = true;
            $scope.has_error = false;
        }

        $scope.addExpense = function () {

            $scope.submitting = true;
            console.log("Hey i'm submitted!");
            console.log($scope.formModel);

            $scope.expense.form.$setSubmitted();

            if ($scope.expense.form.$valid) {
                $nutrition.expense.save($scope.formModel, success, error);
            }
        };

    }])
    .controller('showExpenseController', ['$nutrition', '$scope', '$q', '$stateParams', function ($nutrition, $scope, $q, $stateParams) {
        'use strict';

        console.log($stateParams);
        $scope.promise = $nutrition.expense.get({id: $stateParams.id, tableName: 'expenses'}, success).$promise;
        function error() {
            $scope.error = 'Invalid secret.';
        }
        function success(expense) {
            $scope.expense = [];
            $scope.account_no = $stateParams.id;
            $scope.name = $stateParams.name;
            $scope.previous_arrears = 0;
            angular.forEach(expense.records, function(value, key) {
                $scope.expense[key] = {};
                $scope.expense[key]['transaction_data'] = value.transaction_data;
                $scope.expense[key]['amount'] = value.amount;
                $scope.expense[key]['cash'] = value.cash;
                $scope.expense[key]['arrears'] = $scope.previous_arrears*1 + value.amount*1 - value.cash*1;
                $scope.previous_arrears = $scope.expense[key]['arrears'];
            });
        }

    }])
    .controller('deleteExpenseController', ['$authorize', 'expenses', '$mdDialog', '$nutrition', '$scope', '$q', function ($authorize, donors, $mdDialog, $nutrition, $scope, $q) {
        'use strict';

        this.cancel = $mdDialog.cancel;

        function deleteDessert(dessert, index) {
            var deferred = $nutrition.expense.remove({id: dessert.id, tableName: 'expenses'});

            deferred.$promise.then(function () {
                expenses.splice(index, 1);
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
            $q.all(expenses.forEach(deleteDessert)).then(onComplete);
        }

        this.authorizeUser = function () {
            $authorize.get({secret: $scope.authorize.secret}, success, error);
        };

    }])
    .controller('expenseController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
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
            limit: '50',
            order: 'transaction_data',
            page: 1,
            tableName: 'expenses'
        };

        $scope.limitOptions = [2,4,6];

        function getExpenses(query) {
            $scope.promise = $nutrition.expense.get(query || $scope.query, success).$promise;
        }

        function success(expenses) {
            $scope.expenses = expenses;
        }

        $nutrition.expense_sector.get({
            order: 'id',
            tableName: 'expense_sectors'
        }, function (expense_sectors) {
            $scope.expense_sectors = expense_sectors.records;
        }).$promise;

        $scope.addItem = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'addExpenseController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: 'views/expenses/form.html'
            }).then(getDonors);
        };

        $scope.delete = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'deleteExpenseController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                locals: {donors: $scope.selected},
                templateUrl: 'views/templates/delete-dialog.html'
            }).then(getDonors);
        };

        $scope.onPaginate = function (page, limit) {
            getExpenses(angular.extend({}, $scope.query, {page: page, limit: limit}));
        };

        $scope.onReorder = function (order) {
            getExpenses(angular.extend({}, $scope.query, {order: order}));
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

            getExpenses();
        });
    }]);