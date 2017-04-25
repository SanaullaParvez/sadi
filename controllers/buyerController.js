'use strict';

MadrasaApp.controller('addBuyerController', ['$nutrition', '$scope','Flash', function ($nutrition, $scope, Flash) {
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
            $scope.buyer.form.$setPristine();
            Flash.create('success', '<strong>Well done!</strong> You successfully created a Buyer.');
            console.log(":)");
            $scope.submitting = false;
            $scope.submitted = true;
            $scope.has_error = false;
        }

        $scope.addBuyer = function () {

            $scope.submitting = true;
            console.log("Hey i'm submitted!");
            console.log($scope.formModel);

            $scope.buyer.form.$setSubmitted();

            if ($scope.buyer.form.$valid) {
                $nutrition.buyer.save($scope.formModel, success, error);
            }
        };

    }])
    .controller('deleteBuyerController', ['$authorize', 'buyers', '$mdDialog', '$nutrition', '$scope', '$q', function ($authorize, buyers, $mdDialog, $nutrition, $scope, $q) {
        'use strict';

        this.cancel = $mdDialog.cancel;

        function deleteDessert(dessert, index) {
            var deferred = $nutrition.buyer.remove({id: dessert.id, tableName: 'buyers'});

            deferred.$promise.then(function () {
                buyers.splice(index, 1);
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
            $q.all(buyers.forEach(deleteDessert)).then(onComplete);
        }

        this.authorizeUser = function () {
            $authorize.get({secret: $scope.authorize.secret}, success, error);
        };

    }])
    .controller('buyerController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
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
            limit: '5',
            order: 'id',
            page: 1,
            tableName: 'buyers'
        };

        function getBuyers(query) {
            $scope.promise = $nutrition.buyer.get(query || $scope.query, success).$promise;
        }

        function success(buyers) {
            $scope.buyers = buyers;
        }

        $scope.addItem = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'addBuyerController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: 'views/buyer/form.html'
            }).then(getBuyers);
        };

        $scope.delete = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'deleteBuyerController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                locals: {buyers: $scope.selected},
                templateUrl: 'views/templates/delete-dialog.html'
            }).then(getBuyers);
        };

        $scope.onPaginate = function (page, limit) {
            getBuyers(angular.extend({}, $scope.query, {page: page, limit: limit}));
        };

        $scope.onReorder = function (order) {
            getBuyers(angular.extend({}, $scope.query, {order: order}));
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

            getBuyers();
        });
    }]);