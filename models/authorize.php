<?php
/**
 * Created by PhpStorm.
 * User: sanaulla
 * Date: 2/24/16
 * Time: 12:32 PM
 */
$secret = !empty($_GET["secret"])? $_GET["secret"] : '';
if($secret === 'nasim'){
    var_dump(http_response_code(200));
}else{
    var_dump(http_response_code(404));
}