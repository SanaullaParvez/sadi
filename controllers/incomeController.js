'use strict';

MadrasaApp.controller('addIncomeController', ['$nutrition', '$scope','Flash', function ($nutrition, $scope, Flash) {
        'use strict';

        $scope.formModel = {};
        $scope.submitting = false;
        $scope.submitted = false;
        $scope.has_error = false;
        $nutrition.seller.get({
            order: 'id',
            tableName: 'sellers'
        }, function (sellers) {
            $scope.sellers = sellers;
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
            $scope.income.form.$setPristine();
            Flash.create('success', '<strong>Well done!</strong> You successfully created a Income.');
            console.log(":)");
            $scope.submitting = false;
            $scope.submitted = true;
            $scope.has_error = false;
        }

        $scope.addIncome = function () {

            $scope.submitting = true;
            console.log("Hey i'm submitted!");
            console.log($scope.formModel);

            $scope.income.form.$setSubmitted();

            if ($scope.income.form.$valid) {
                $nutrition.income.save($scope.formModel, success, error);
            }
        };

    }])
    .controller('showIncomeController', ['$nutrition', '$scope', '$q', '$stateParams', function ($nutrition, $scope, $q, $stateParams) {
        'use strict';

        console.log($stateParams);
        $scope.promise = $nutrition.income.get({id: $stateParams.id, tableName: 'incomes'}, success).$promise;
        function error() {
            $scope.error = 'Invalid secret.';
        }
        function success(income) {
            $scope.income = [];
            $scope.account_no = $stateParams.id;
            $scope.name = $stateParams.name;
            $scope.previous_due = 0;
            angular.forEach(income.records, function(value, key) {
                $scope.income[key] = {};
                $scope.income[key]['transaction_data'] = value.transaction_data;
                $scope.income[key]['amount'] = value.amount;
                $scope.income[key]['cash'] = value.cash;
                $scope.income[key]['due'] = $scope.previous_due*1 + value.amount*1 - value.cash*1;
                $scope.previous_due = $scope.income[key]['due'];
            });
        }

    }])
    .controller('deleteIncomeController', ['$authorize', 'incomes', '$mdDialog', '$nutrition', '$scope', '$q', function ($authorize, donors, $mdDialog, $nutrition, $scope, $q) {
        'use strict';

        this.cancel = $mdDialog.cancel;

        function deleteDessert(dessert, index) {
            var deferred = $nutrition.income.remove({id: dessert.id, tableName: 'incomes'});

            deferred.$promise.then(function () {
                incomes.splice(index, 1);
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
            $q.all(incomes.forEach(deleteDessert)).then(onComplete);
        }

        this.authorizeUser = function () {
            $authorize.get({secret: $scope.authorize.secret}, success, error);
        };

    }])
    .controller('incomeController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
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
            limit: '10',
            order: 'transaction_data',
            page: 1,
            tableName: 'incomes'
        };

        function getIncomes(query) {
            $scope.promise = $nutrition.income.get(query || $scope.query, success).$promise;
        }

        function success(incomes) {
            $scope.incomes = incomes;
        }

        $scope.addItem = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'addIncomeController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: 'views/incomes/form.html'
            }).then(getDonors);
        };

        $scope.delete = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'deleteIncomeController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                locals: {donors: $scope.selected},
                templateUrl: 'views/templates/delete-dialog.html'
            }).then(getDonors);
        };

        $scope.onPaginate = function (page, limit) {
            getIncomes(angular.extend({}, $scope.query, {page: page, limit: limit}));
        };

        $scope.onReorder = function (order) {
            getIncomes(angular.extend({}, $scope.query, {order: order}));
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

            getIncomes();
        });
    }]);