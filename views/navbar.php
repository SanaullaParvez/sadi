<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" ui-sref= "home">{{'SADI' | translate}}</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
            </ul>
            <ul class="nav navbar-nav navbar-right">
<!--                 <li><a href="#">Dashboard</a></li>
                <li><a href="#">Settings</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Help</a></li> -->
                <li ng-class="{ active: isActive('/stone')}"><a ui-sref= "stone" >{{ 'STONE' | translate }}</a></li>
                <li ng-class="{ active: isActive('/new_stone')}"><a ui-sref= "new_stone" >{{ 'NEW_STONE' | translate }}</a></li>
                <li ng-class="{ active: isActive('/expense_sector')}"><a ui-sref= "expense_sector" >{{ 'EXPENSE_SECTOR' | translate }}</a></li>
                <li ng-class="{ active: isActive('/new_expense_sector')}"><a ui-sref= "new_expense_sector" >{{ 'NEW_EXPENSE_SECTOR' | translate }}</a></li>
            </ul>
        </div>
    </div>
</nav>