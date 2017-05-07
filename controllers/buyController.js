'use strict';

MadrasaApp.controller('addBuyController', ['$nutrition', '$scope', 'Flash', function ($nutrition, $scope, Flash) {
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
            $scope.buy.form.$setPristine();
            Flash.create('success', '<strong>Well done!</strong> You successfully created a Buy.');
            console.log(":)");
            $scope.submitting = false;
            $scope.submitted = true;
            $scope.has_error = false;
        }

        $scope.addBuy = function () {

            $scope.submitting = true;
            console.log("Hey i'm submitted!");
            console.log($scope.formModel);

            $scope.buy.form.$setSubmitted();

            if ($scope.buy.form.$valid) {
                $nutrition.buy.save($scope.formModel, success, error);
            }
        };

    }])
    .controller('deleteBuyController', ['$authorize', 'buys', '$mdDialog', '$nutrition', '$scope', '$q', function ($authorize, buys, $mdDialog, $nutrition, $scope, $q) {
        'use strict';

        this.cancel = $mdDialog.cancel;
        console.log(buys);

        function deleteDessert(dessert, index) {
            var deferred = $nutrition.buy.remove({receipt_no: dessert.receipt_no, tableName: 'buys'});

            deferred.$promise.then(function () {
                buys.splice(index, 1);
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
            $q.all(buys.forEach(deleteDessert)).then(onComplete);
        }

        this.authorizeUser = function () {
            $authorize.get({secret: $scope.authorize.secret}, success, error);
        };

    }])
    .controller('buyController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
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
            tableName: 'buys'
        };

        function getSellers(query) {
            $scope.promise = $nutrition.buy.get(query || $scope.query, success).$promise;
        }

        function success(buys) {
            $scope.buys_count = buys.count;
            $scope.buys = [];  
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
            
            angular.forEach(buys.records, function(value, key) {
                $scope.buys[key] = {};
                $scope.buys[key]['transaction_data'] = value.transaction_data;
                $scope.buys[key]['receipt_no'] = value.receipt_no;
                $scope.buys[key]['buyer_name'] = value.buyer_name;
                $scope.buys[key]['volder'] = value.volder*1;
                $scope.buys[key]['total_volder'] = $scope.total_volder + $scope.buys[key]['volder'];
                $scope.buys[key]['volder34'] = (value.volder34*1) + ( $scope.buys[key]['volder'] * (88/100) );
                $scope.buys[key]['total_volder34'] = $scope.total_volder34 + $scope.buys[key]['volder34'];
                $scope.buys[key]['volder12'] = (value.volder12*1) + ( $scope.buys[key]['volder'] * (7/100) );
                $scope.buys[key]['total_volder12'] = $scope.total_volder12 + $scope.buys[key]['volder12'];
                $scope.buys[key]['volder510'] = (value.volder510*1) + ( $scope.buys[key]['volder'] * (5/100) );
                $scope.buys[key]['total_volder510'] = $scope.total_volder510 + $scope.buys[key]['volder510'];
                $scope.buys[key]['vutu'] = value.vutu*1;
                $scope.buys[key]['total_vutu'] = $scope.total_vutu + $scope.buys[key]['vutu'];
                $scope.buys[key]['vutu34'] =( value.vutu34*1) + ( $scope.buys[key]['vutu'] * (88/100) );
                $scope.buys[key]['total_vutu34'] = $scope.total_vutu34 + $scope.buys[key]['vutu34'];
                $scope.buys[key]['vutu12'] = (value.vutu12*1) + ( $scope.buys[key]['vutu'] * (7/100) );
                $scope.buys[key]['total_vutu12'] = $scope.total_vutu12 + $scope.buys[key]['vutu12'];
                $scope.buys[key]['vutu510'] = (value.vutu510*1) + ( $scope.buys[key]['vutu'] * (5/100) );
                $scope.buys[key]['total_vutu510'] = $scope.total_vutu510 + $scope.buys[key]['vutu510'];
                $scope.buys[key]['singel'] = value.singel*1;
                $scope.buys[key]['total_singel'] = $scope.total_singel + $scope.buys[key]['singel'];
                $scope.total_volder = $scope.buys[key]['total_volder'];
                $scope.total_volder34 = $scope.buys[key]['total_volder34'];
                $scope.total_volder12 = $scope.buys[key]['total_volder12'];
                $scope.total_volder510 = $scope.buys[key]['total_volder510'];
                $scope.total_vutu = $scope.buys[key]['total_vutu'];
                $scope.total_vutu34 = $scope.buys[key]['total_vutu34'];
                $scope.total_vutu12 = $scope.buys[key]['total_vutu12'];
                $scope.total_vutu510 = $scope.buys[key]['total_vutu510'];
                $scope.total_singel = $scope.buys[key]['total_singel'];
            });
        }

        $scope.getTotal = function(product,index){
            var total = 0;
            for(var i = 0; i <= index; i++){
                var subTotal = $scope.buys.records[i][product];
                total += subTotal*1;
            }
            return total;
        }
        $scope.addItem = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'addBuyController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: 'views/buy/form.html'
            }).then(getSellers);
        };

        $scope.delete = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'deleteBuyController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                locals: {buys: $scope.selected},
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