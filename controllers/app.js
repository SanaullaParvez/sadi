angular.isUndefinedOrNull = function (val) {
    return angular.isUndefined(val) || val === null
}
var MadrasaApp = angular.module('mms', [
    'jcs-autoValidate',
    'angular-ladda',
    'ui.router',
    'pascalprecht.translate',
    'md.data.table',
    'ngMaterial',
    'ngResource',
    'oc.lazyLoad',
    'ngFlash'
]);

MadrasaApp.config(function ($httpProvider) {
    //$httpProvider.defaults.headers.common['Access-Token'] = '562391dc787b6bbabb0c99dd8db05160e989c68d0fc9ec29ee96dce3d247ddbe7bb368711ff361e67eee3ee7c465347f17b115fc63f7fc6f2b03044e87d09eda'
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

});

MadrasaApp.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$translateProvider',
    function ($stateProvider, $urlRouterProvider, $translateProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/404");
        //
        // Now set up the states
        $stateProvider
            .state('404', {
                url: "/404",
                templateUrl: "views/404.html"
            })
            .state('home', {
                url: "/home",
                templateUrl: "views/home.html"
            })
            .state('student', {
                url: "/student",
                templateUrl: "views/student/students.html",
                controller: 'studentController'
            })
            .state('sales', {
                url: "/sales",
                templateUrl: "views/sales/index.html",
                controller: 'saleController'
            })
            .state('new_sale', {
                url: "/new_sale",
                templateUrl: "views/sales/form.html",
                controller: 'addSaleController'
            })
            .state('buy', {
                url: "/buy",
                templateUrl: "views/buys/index.html",
                controller: 'buyController'
            })
            .state('new_buy', {
                url: "/new_buy",
                templateUrl: "views/buys/form.html",
                controller: 'addBuyController'
            })
            .state('student_admission', {
                url: "/student_admission",
                templateUrl: "views/student/form.html",
                controller: 'addStudentController'
            })
            .state('incomes', {
                url: "/incomes",
                templateUrl: "views/incomes/index.html",
                controller: 'incomeController'
            })
            .state('new_income', {
                url: "/new_income",
                templateUrl: "views/incomes/form.html",
                controller: 'addIncomeController'
            })
            .state('income', {
                url: "/income/{:id,:name}",
                templateUrl: "views/incomes/show.html",
                controller: 'showIncomeController'
            })
            .state('expenses', {
                url: "/expenses",
                templateUrl: "views/expenses/index.html",
                controller: 'expenseController'
            })
            .state('new_expense', {
                url: "/new_expense",
                templateUrl: "views/expenses/form.html",
                controller: 'addExpenseController'
            })
            .state('expense', {
                url: "/expense/{:id,:name}",
                templateUrl: "views/expenses/show.html",
                controller: 'showExpenseController'
                // controller: function($scope, $stateParams) {
                //     console.log($stateParams.id);
                // }
            })
            .state('seller', {
                url: "/seller",
                templateUrl: "views/sellers/index.html",
                controller: 'sellerController'
            })
            .state('new_seller', {
                url: "/new_seller",
                templateUrl: "views/sellers/form.html",
                controller: 'addSellerController'
            })
            .state('buyer', {
                url: "/buyer",
                templateUrl: "views/buyers/index.html",
                controller: 'buyerController'
            })
            .state('new_buyer', {
                url: "/new_buyer",
                templateUrl: "views/buyers/form.html",
                controller: 'addBuyerController'
            })
            .state('stone', {
                url: "/stone",
                templateUrl: "views/stones/index.html",
                controller: 'stoneController'
            })
            .state('new_stone', {
                url: "/new_stone",
                templateUrl: "views/stones/form.html",
                controller: 'addStoneController'
            })
            .state('expense_sector', {
                url: "/expense_sector",
                templateUrl: "views/expense_sectors/index.html",
                controller: 'expenseSectorController'
            })
            .state('new_expense_sector', {
                url: "/new_expense_sector",
                templateUrl: "views/expense_sectors/form.html",
                controller: 'addExpenseSectorController'
            });
        $translateProvider.translations('bn', {
            'SADI': '>>  সাদী স্টোন ক্রাশার',

            'TEACHER': 'ওস্তাদ',
            'TEACHER_ADMISSION': 'নতুন ওস্তাদ',
            'ID': 'ক্রমিক নং ',
            'teacher_admission_no': 'নিয়োগ নং ',
            'teacher_admission_date': 'মাস ',
            'name': 'নাম ',
            'address': 'ঠিকানা ',
            'cantact_no': 'মোবাইল নং ',
            'designation': 'পদবী ',
            'basic_salary': 'মূল বেতন ',
            'honors_salary': 'অতিরিক্ত দায়িত্বের সম্মানী ',
            'attendance_salary': 'উপস্থিতি ',
            'eid_bonus': 'ঈদ বোনাস ',
            'effort_bonus': 'মেহনত বোনাস ',
            'treatment_bonus': 'চিকিৎসা বোনাস ',
            'previous_due_salary': 'পূর্বের বকেয়া ',
            'advance_salary': 'অগ্রিম ',
            'total_salary': 'মোট প্রাপ্য ',


            'STUDENT': 'ছাত্র',
            'ADMISSION': 'ভর্তি',
            'STUDENT_ADMISSION': 'ছাত্র ভর্তি',
            'admission_no': 'ভর্তি নং ',
            'admission_date': 'ভর্তির তারিখ ',
            'age': 'বয়স ',
            'father_name': 'পিতার নাম ',
            'guardian_name': 'অভিভাবক ',
            'relation': 'সম্পর্ক ',
            'contact_no': 'মোবাইল ',
            'class_name': 'জামাত ',
            'rental_bill': 'বোডিং বাবদ',
            'monthly_fees': 'বেতন বাবদ ',
            'book_bill': 'কিতাব বাবদ ',
            'cash': 'নগদ ',
            'arrears': 'বকেয়া ',
            'mullo': 'মূল্য ',

            'DONOR': 'দাতা ',
            'donor_name': 'দাতার নাম ',
            'date': 'তারিখ ',
            'quantity': 'পরিমাণ ',
            'start_date': 'মাস ',
            'DONOR_ADMISSION': ' নতুন দাতা ',


            'CREDITOR': 'পাওনাদার ',
            'creditor_name': 'দাতার নাম ',
            'description': 'বিবরণ ',
            'rate': 'দর ',
            'total': 'মোট ',
            'previous_due': 'পূর্বের দেনা  ',
            'payment': 'পরিশোধ ',
            'current_dues': 'বর্তমান প্রাপ্য',
            'CREDITOR_ADMISSION': ' নতুন পাওনাদার ',
            'amount': 'পরিমান',
            'receipt_no': 'ভাউচার নং',
            'id': 'নং',
            'stone_name': 'পাথরের নাম ',
            'STONE': 'পাথর',
            'NOGOD': 'নগদ',
            'CHECK': 'চেক',
            'buyer_name': 'বিক্রেতার নাম ',
            'seller_name': 'ক্রেতার নাম ',
            'account_no': 'হিসাব নং',
            'chalan_no': 'চালান নং',
            'porisod': 'পরিশোধ ',
            'paona_taka': 'পাওনা টাকা',
            'peaeci': 'পেয়েছি ',
            'baki_paona': 'বাকি পাওনা',

            'SALE': 'ক্রয় মালের হিসাব',
            'BUY': 'বিক্রয় মালের হিসাব',
            'NEW_SALE': 'নতুন ক্রয়',
            'NEW_BUY': 'নতুন বিক্রয়',
            'NEW_INCOME': 'নতুন আয়',
            'NEW_EXPENSE': 'নতুন খরচ',
            'INCOMES': 'আয়ের হিসাব',
            'EXPENSES': 'খরচের হিসাব',
            'SELLER': 'ক্রেতা',
            'BUYER': 'বিক্রেতা ',
            'NEW_SELLER': 'নতুন ক্রেতা ',
            'NEW_BUYER': 'নতুন বিক্রেতা',
            'STONE': 'পাথর',
            'VOLDER': 'ভোন্ভার',
            'VOLDER34': 'ভোন্ভার ৩/৪',
            'VOLDER12': 'ভোন্ভার ১/২',
            'VOLDER510': 'ভোন্ভার ৫/১০',
            'VUTU': 'ভুতু',
            'VUTU34': 'ভুতু ৩/৪',
            'VUTU12': 'ভুতু ১/২',
            'VUTU510': 'ভুতু ৫/১০',
            'SINGEL': 'সিঙ্গেল',

            'NEW_STONE': 'নতুন পাথর',
            'EXPENSE_SECTOR': 'খরচের খাত',
            'NEW_EXPENSE_SECTOR': 'নতুন খরচের খাত',
            'SELECT_BUYER': 'বিক্রেতা নির্ধারন করুন',
            'SELECT_SELLER': 'ক্রেতা নির্ধারন করুন',
            'SELECT_STONE': 'পাথর নির্ধারন করুন',
            'SELECT_DETAIL': 'নগদ / চেক',
            'SELECT_EXPENSE_SECTOR': 'খরচের খাত নির্ধারন করুন'


        });
        $translateProvider.preferredLanguage('bn');
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
    }]);

MadrasaApp.config(['$compileProvider', '$mdThemingProvider', function ($compileProvider, $mdThemingProvider) {
    'use strict';
    $compileProvider.debugInfoEnabled(true);
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('blue');
}]);

MadrasaApp.controller('mmsCtrl', [
    '$scope',
    '$filter',
    '$http',
    '$translate',
    '$location',
    //'Records',
    '$httpParamSerializerJQLike',
    function ($scope, $filter, $http, $translate, $location, Records, $httpParamSerializerJQLike) {
        $scope.autoScroll = true;
        /**
         * Function to change the default language
         * @param {String} key - language key
         */
        $scope.changeLanguage = function (key) {
            $translate.use(key);
        };
        $scope.isSidebarOpen = true;
        $scope.today = $filter("date")(Date.now(), 'yyyy-MM-dd'); //"2016-02-20";
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        /**
         * Function to get data list from Database
         */
        /*        Records.students().then(function (students) {
         console.log(students);
         $scope.students = students;
         $scope.student_key = students.length ? Object.keys(students[0]) : '';
         });
         Records.teachers().then(function (teachers) {
         console.log(teachers);
         $scope.teachers = teachers;
         $scope.teacher_key = teachers.length ? Object.keys(teachers[0]) : '';
         });
         Records.jamats().then(function (jamats) {
         console.log(jamats);
         $scope.jamats = jamats;
         });
         Records.donors().then(function (donors) {
         console.log(donors);
         $scope.donors = donors;
         $scope.donor_key = donors.length ? Object.keys(donors[0]) : '';
         });*/

        /*
         $scope.formModel = {};
         $scope.submitting = false;
         $scope.submitted = false;
         $scope.has_error = false;
         $scope.onSubmit = function () {
         $scope.submitting = true;
         console.log("Hey i'm submitted!");
         console.log($scope.formModel);

         $http({
         url: 'http://localhost/angular_awesome/models/student.php',
         method: 'POST',
         paramSerializer: '$httpParamSerializerJQLike',
         data: $scope.formModel
         }).success(function (data) {
         console.log(":)");
         $scope.submitting = false;
         $scope.submitted = true;
         $scope.has_error = false;
         }).error(function(data) {
         console.log(":(");
         console.log(data);
         $scope.submitting = false;
         $scope.submitted = false;
         $scope.has_error = true;
         });

         };
         */

    }]);
MadrasaApp.factory('$nutrition', ['$resource', function ($resource) {
    'use strict';

    return {
        buyer: $resource('models/buyer.php'),
        buy: $resource('models/buy.php'),
        expense: $resource('models/expense.php'),
        expense_sector: $resource('models/expense_sector.php'),
        income: $resource('models/income.php'),
        sale: $resource('models/sale.php'),
        seller: $resource('models/seller.php'),
        stone: $resource('models/stone.php'),
        students: $resource('models/student.php')
    };
}]);
MadrasaApp.factory('$authorize', ['$resource', function ($resource) {
    'use strict';

    return $resource('models/authorize.php');
}]);
MadrasaApp.filter('translateToBengali', [function() {
    return function (monthNumber) { //1 = January
        var monthNames = [ 'জানুয়ারী ', 'ফেব্রুয়ারি ', 'মার্চ', 'এপ্রিল', 'মে ', 'জুন ',
            'জুলাই ', 'অগাস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর' ];
        return monthNames[monthNumber - 1];
    }
}]);
/*MadrasaApp.factory('Records', ['$http', '$q', function ($http, $q) {
    return {
        data: {
            select: 'http://localhost/angular_awesome/models/student.php'
        },
        students: function () {
            var d = $q.defer();
            $http.get(this.data.select, {
                params: {table_name: 'students'}
            }).success(function (data) {
                d.resolve(data.records)
            }).error(function (msg) {
                d.reject(msg)
                console.log(msg)
            });
            return d.promise;
        },
        teachers: function () {
            var d = $q.defer();
            $http.get(this.data.select, {
                params: {table_name: 'teachers'}
            }).success(function (data) {
                d.resolve(data.records)
            }).error(function (msg) {
                d.reject(msg)
                console.log(msg)
            });
            return d.promise;
        },
        jamats: function () {
            var d = $q.defer();
            $http.get(this.data.select, {
                params: {table_name: 'jamats'}
            }).success(function (data) {
                d.resolve(data.records)
            }).error(function (msg) {
                d.reject(msg)
                console.log(msg)
            });
            return d.promise;
        },
        donors: function () {
            var d = $q.defer();
            $http.get(this.data.select, {
                params: {table_name: 'donors'}
            }).success(function (data) {
                d.resolve(data.records)
            }).error(function (msg) {
                d.reject(msg)
                console.log(msg)
            });
            return d.promise;
        }
    }
}]);*/
