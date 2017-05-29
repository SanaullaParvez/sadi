'use strict';

MadrasaApp.controller('addStudentController', ['$nutrition', '$scope', 'Flash', function ($nutrition, $scope, Flash) {
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
            $scope.student.form.$setPristine();
            Flash.create('success', '<strong>Well done!</strong> You successfully created a Donor.');
            console.log(":)");
            $scope.submitting = false;
            $scope.submitted = true;
            $scope.has_error = false;
        }

        $scope.addStudent = function () {

            $scope.submitting = true;
            console.log("Hey i'm submitted!");
            console.log($scope.formModel);

            $scope.student.form.$setSubmitted();

            if ($scope.student.form.$valid) {
                $nutrition.students.save($scope.formModel, success, error);
            }
        };

    }])
    .controller('deleteStudentController', ['$authorize', 'students', '$mdDialog', '$nutrition', '$scope', '$q', function ($authorize, students, $mdDialog, $nutrition, $scope, $q) {
        'use strict';

        this.cancel = $mdDialog.cancel;

        function deleteDessert(dessert, index) {
            var deferred = $nutrition.students.remove({id: dessert.id, tableName: 'students'});

            deferred.$promise.then(function () {
                students.splice(index, 1);
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
            $q.all(students.forEach(deleteDessert)).then(onComplete);
        }

        this.authorizeUser = function () {
            $authorize.get({secret: $scope.authorize.secret}, success, error);
        };

    }])
    .controller('studentController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
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
            tableName: 'students'
        };

        function getStudents(query) {
            $scope.promise = $nutrition.students.get(query || $scope.query, success).$promise;
        }

        function success(students) {
            $scope.students = students;
        }

        $scope.addItem = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'addStudentController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                templateUrl: 'views/student/form.html'
            }).then(getStudents);
        };

        $scope.delete = function (event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'deleteStudentController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: event,
                locals: {students: $scope.selected},
                templateUrl: 'views/templates/delete-dialog.html'
            }).then(getStudents);
        };

        $scope.onPaginate = function (page, limit) {
            getStudents(angular.extend({}, $scope.query, {page: page, limit: limit}));
        };

        $scope.onReorder = function (order) {
            getStudents(angular.extend({}, $scope.query, {order: order}));
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

            getStudents();
        });
    }])
    .controller('incomeExpenseController', ['$nutrition', '$scope', '$q', '$stateParams', function ($nutrition, $scope, $q, $stateParams) {
        'use strict';

        console.log($stateParams);
        $scope.promise = $nutrition.income_expense.get({}, success).$promise;
        function error() {
            $scope.error = 'Invalid secret.';
        }
        function success(expense) {
            $scope.expense = [];
            $scope.account_no = $stateParams.id;
            $scope.name = $stateParams.name;
            $scope.closing_balance = 0;
            angular.forEach(expense.records, function(value, key) {
                $scope.expense[key] = {};
                $scope.expense[key]['transaction_data'] = value.transaction_data;
                $scope.expense[key]['income'] = value.income;
                $scope.expense[key]['expense'] = value.expense;
                $scope.expense[key]['total'] = $scope.closing_balance*1 + value.income*1 - value.expense*1;
                $scope.closing_balance = $scope.expense[key]['total'];
            });
        }

    }]);