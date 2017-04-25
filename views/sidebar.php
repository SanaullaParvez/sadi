<a class="isSidebarOpen" href ng-click="isSidebarOpen = !isSidebarOpen"><span ng-class="{'glyphicon glyphicon-menu-down':isSidebarOpen,'glyphicon glyphicon-menu-up':!isSidebarOpen}" aria-hidden="true"></span></a>
<div ng-show="isSidebarOpen" class="col-sm-3 col-md-2 sidebar">
    <ul class="nav nav-sidebar">
        <li ng-class="{ active: isActive('/new_sale')}"><a ui-sref= "new_sale" >{{ 'NEW_SALE' | translate }}</a></li>
        <li ng-class="{ active: isActive('/sales')}"><a ui-sref= "sales" >{{ 'SALE' | translate }}</a></li>
        <li ng-class="{ active: isActive('/new_expense')}"><a ui-sref= "new_expense" >{{ 'NEW_EXPENSE' | translate }}</a></li>
        <li ng-class="{ active: isActive('/expenses')}"><a ui-sref= "expenses" >{{ 'EXPENSES' | translate }}</a></li>
        <li>------------------------------------------</li>
        <li ng-class="{ active: isActive('/new_buy')}"><a ui-sref= "new_buy" >{{ 'NEW_BUY' | translate }}</a></li>
        <li ng-class="{ active: isActive('/buy')}"><a ui-sref= "buy" >{{ 'BUY' | translate }}</a></li>
        <li ng-class="{ active: isActive('/new_income')}"><a ui-sref= "new_income" >{{ 'NEW_INCOME' | translate }}</a></li>
        <!-- <li ng-class="{ active: isActive('/student')}"><a ui-sref= "student" >{{ 'STUDENT' | translate }}</a></li>
        <li ng-class="{ active: isActive('/student_admission')}"><a ui-sref= "student_admission" >{{ 'STUDENT_ADMISSION' | translate }}</a></li> -->
        <li ng-class="{ active: isActive('/incomes')}"><a ui-sref= "incomes" >{{ 'INCOMES' | translate }}</a></li>

    </ul>
</div>