<!DOCTYPE html>
<html lang="en" data-ng-app="mms" data-ng-controller="mmsCtrl">
<?php include 'views/header.php'; ?>
<body>

<?php include 'views/navbar.php'; ?>
<div class="container-fluid">
    <div class="row">
        <?php include 'views/sidebar.php'; ?>
        <div ui-view ng-class="{'col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 ':isSidebarOpen,'col-sm-12 col-sm-offset-0 col-md-12 col-md-offset-0 ':!isSidebarOpen}" class="main">
        </div>
    </div>
</div>
<?php include 'views/footer.php'; ?>

</body>
</html>

