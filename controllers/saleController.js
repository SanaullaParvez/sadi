'use strict';

MadrasaApp.controller('addSaleController', ['$nutrition', '$scope', 'Flash', function ($nutrition, $scope, Flash) {
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

        $nutrition.stone.get({
            order: 'id',
            tableName: 'stones'
        }, function (stones) {
            $scope.stones = stones;
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
            $scope.sale.form.$setPristine();
            Flash.create('success', '<strong>Well done!</strong> You successfully created a Sale.');
            console.log(":)");
            $scope.submitting = false;
            $scope.submitted = true;
            $scope.has_error = false;
        }

        $scope.addSale = function () {

            $scope.submitting = true;
            console.log("Hey i'm submitted!");
            console.log($scope.formModel);

            $scope.sale.form.$setSubmitted();

            if ($scope.sale.form.$valid) {
                $nutrition.sale.save($scope.formModel, success, error);
            }
        };

    }])
    .controller('deleteSaleController', ['$authorize', 'sellers', '$mdDialog', '$nutrition', '$scope', '$q', function ($authorize, sellers, $mdDialog, $nutrition, $scope, $q) {
        'use strict';

        this.cancel = $mdDialog.cancel;

        function deleteDessert(dessert, index) {
            var deferred = $nutrition.sale.remove({id: dessert.id, tableName: 'sales'});

            deferred.$promise.then(function () {
                sellers.splice(index, 1);
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
            $q.all(sellers.forEach(deleteDessert)).then(onComplete);
        }

        this.authorizeUser = function () {
            $authorize.get({secret: $scope.authorize.secret}, success, error);
        };

    }])
    .controller('saleController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
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
            order: 'receipt_no',
            page: 1,
            tableName: 'sales'
        };

        function getSellers(query) {
            $scope.promise = $nutrition.sale.get(query || $scope.query, success).$promise;
        }

        function success(sales) {
            $scope.sales_count = sales.count;
            $scope.sales = [];
            $scope.total_volder = 0;
            $scope.volder34 = 0;
            $scope.total_volder34 = 0;
            $scope.total_volder12 = 0;
            $scope.total_volder510 = 0;
            $scope.total_vutu = 0;
            $scope.total_vutu34 = 0;
            $scope.total_vutu12 = 0;
            $scope.total_vutu510 = 0;
            $scope.total_singel = 0;
            
            angular.forEach(sales.records, function(value, key) {
                $scope.sales[key] = {};
                $scope.sales[key]['transaction_data'] = value.transaction_data;
                $scope.sales[key]['receipt_no'] = value.receipt_no;
                $scope.sales[key]['buyer_name'] = value.buyer_name;
                $scope.sales[key]['volder'] = value.volder*1;
                $scope.sales[key]['total_volder'] = $scope.total_volder + $scope.sales[key]['volder'];
                $scope.sales[key]['volder34'] = (value.volder34*1) + ( $scope.sales[key]['volder'] * (88/100) );
                $scope.sales[key]['total_volder34'] = $scope.total_volder34 + $scope.sales[key]['volder34'];
                $scope.sales[key]['volder12'] = (value.volder12*1) + ( $scope.sales[key]['volder'] * (7/100) );
                $scope.sales[key]['total_volder12'] = $scope.total_volder12 + $scope.sales[key]['volder12'];
                $scope.sales[key]['volder510'] = (value.volder510*1) + ( $scope.sales[key]['volder'] * (5/100) );
                $scope.sales[key]['total_volder510'] = $scope.total_volder510 + $scope.sales[key]['volder510'];
                $scope.sales[key]['vutu'] = value.vutu*1;
                $scope.sales[key]['total_vutu'] = $scope.total_vutu + $scope.sales[key]['vutu'];
                $scope.sales[key]['vutu34'] =( value.vutu34*1) + ( $scope.sales[key]['vutu'] * (88/100) );
                $scope.sales[key]['total_vutu34'] = $scope.total_vutu34 + $scope.sales[key]['vutu34'];
                $scope.sales[key]['vutu12'] = (value.vutu12*1) + ( $scope.sales[key]['vutu'] * (7/100) );
                $scope.sales[key]['total_vutu12'] = $scope.total_vutu12 + $scope.sales[key]['vutu12'];
                $scope.sales[key]['vutu510'] = (value.vutu510*1) + ( $scope.sales[key]['vutu'] * (5/100) );
                $scope.sales[key]['total_vutu510'] = $scope.total_vutu510 + $scope.sales[key]['vutu510'];
                $scope.sales[key]['singel'] = value.singel*1;
                $scope.sales[key]['total_singel'] = $scope.total_singel + $scope.sales[key]['singel'];
                // $scope.sales[key]['amount'] = value.amount;
                // $scope.sales[key]['cash'] = value.cash;
                // $scope.sales[key]['due'] = $scope.previous_due*1 + value.amount*1 - value.cash*1;
                $scope.total_volder = $scope.sales[key]['total_volder'];
                $scope.total_volder34 = $scope.sales[key]['total_volder34'];
                $scope.total_volder12 = $scope.sales[key]['total_volder12'];
                $scope.total_volder510 = $scope.sales[key]['total_volder510'];
                $scope.total_vutu = $scope.sales[key]['total_vutu'];
                $scope.total_vutu34 = $scope.sales[key]['total_vutu34'];
                $scope.total_vutu12 = $scope.sales[key]['total_vutu12'];
                $scope.total_vutu510 = $scope.sales[key]['total_vutu510'];
                $scope.total_singel = $scope.sales[key]['total_singel'];
            });
        }

        $scope.getTotal = function(product,index){
            var total = 0;
            for(var i = 0; i <= index; i++){
                var subTotal = $scope.sales.records[i][product];
                total += subTotal*1;
            }
            return total;
        }
        $scope.addItem = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'addSaleController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: 'views/sale/form.html'
            }).then(getSellers);
        };

        $scope.delete = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'deleteSaleController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                locals: {sellers: $scope.selected},
                templateUrl: 'views/templates/delete-dialog.html'
            }).then(getSellers);
        };

        $scope.onPaginate = function (page, limit) {
            getSellers(angular.extend({}, $scope.query, {page: page, limit: limit}));
        };

        $scope.onReorder = function (order) {
            getSellers(angular.extend({}, $scope.query, {order: order}));
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

            getSellers();
        });
    }]);