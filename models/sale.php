<?php
include_once 'setup.php';
$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'GET'){
    $table_name = !empty($_GET["table_name"])? $_GET["table_name"] : $_GET["tableName"];
    $num_rows = $mysqli->query("SELECT * FROM ($table_name)")->num_rows;
    $limit = !empty($_GET['limit'])? $_GET['limit'] : $num_rows;
    $page = !empty($_GET['page'])? ($_GET['page'] - 1) * $limit : 0;
    $rest = !empty($_GET['order'])? substr($_GET['order'], 0, 1): '';
    if(!empty($_GET['order'])){
        if(substr($_GET['order'], 0, 1) === '-'){
            $order = substr($_GET['order'], 1).' '.'DESC';
        }else{
            $order = $_GET['order'];
        }
    }else{
        $order = 'id';
    }
    $filter = !empty($_GET['filter'])? $_GET['filter'].'%' : '%';

    $sql = "SELECT sales.id as id, transaction_data, receipt_no, buyers.name as buyer_name, IF(stone_id = 1, quantity,0) AS volder , IF(stone_id = 2, quantity,0) AS vutu, IF(stone_id = 3, quantity,0) AS singel,IF(stone_id = 4, quantity,0) AS volder34,IF(stone_id = 5, quantity,0) AS volder12,IF(stone_id = 6, quantity,0) AS vutu510,IF(stone_id = 7, quantity,0) AS vutu34,IF(stone_id = 8, quantity,0) AS vutu12,IF(stone_id = 9, quantity,0) AS volder510 FROM ($table_name) INNER JOIN buyers ON buyers.account_no = sales.buyer_id WHERE transaction_data LIKE '$filter' ORDER BY $order DESC LIMIT $page, $limit";
    $result = $mysqli->query($sql);
    if ($result) {
        // $output = ["records"=>[],"count"=>$num_rows];
        $output = array('records' => array(), 'count' => $num_rows );
        $object = new stdClass();
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            array_push($output["records"],$rs);
        }
        $object = json_encode($output);
        echo $object;
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }    
}elseif($method == 'DELETE'){
    $table_name = !empty($_GET["table_name"])? $_GET["table_name"] : $_GET["tableName"];
    // $id = !empty($_GET['id'])? $_GET['id'] : '';
    $receipt_no = !empty($_GET['receipt_no'])? $_GET['receipt_no'] : '';
    $sql = "DELETE FROM $table_name WHERE receipt_no='$receipt_no'";

    if ($mysqli->query($sql) === TRUE) {
        echo "true";
    } else {
        echo "Error deleting record: " . $sql . $mysqli->error;
    }
}elseif($method === 'POST'){
    // if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)){
        $_POST = json_decode(file_get_contents('php://input'), true);
    // }
    function post($var)
    {
        return $intLat = !empty($_POST[$var]) ? $_POST[$var] : "NULL";
    }
    $transaction_data = !empty($_POST["transaction_data"]) ? date("Y-m-d H:i:s", strtotime($_POST["transaction_data"])) : date("Y-m-d H:i:s");
    $receipt_no = post("receipt_no");
    $buyer_id = post("buyer_id");
    $stone_id = post("stone_id");
    $quantity = post("quantity");
    $rate = post("rate");
    $amount = post("quantity") * post("rate");
    $details = post("details");
    $cash = post("cash");
    $arrears = post("quantity") * post("rate") - post("cash");

    $sql = "INSERT INTO sales (`transaction_data`, `receipt_no`, `buyer_id`, `stone_id`, `quantity`, `rate`, `amount`, `details`, `cash`, `arrears`)
            VALUES ('{$transaction_data}', '{$receipt_no}', $buyer_id, $stone_id, $quantity, $rate, $amount, '{$details}', IFNULL($cash, 0), $arrears)";
//    $sql1 = "INSERT INTO expenses (`transaction_data`, `receipt_no`, `sector_id`, //`buyer_id`, `amount`, `cash`)
//            VALUES ('{$transaction_data}', $receipt_no, 1, $buyer_id, $amount, $cash)";


    if ($mysqli->query($sql) === TRUE) {
        return true;
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }
}

$mysqli->close();

?>