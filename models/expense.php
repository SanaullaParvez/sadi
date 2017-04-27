<?php
include_once 'setup.php';
$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'GET'){
    $table_name = !empty($_GET["table_name"])? $_GET["table_name"] : $_GET["tableName"];
    if(!empty($_GET['id'])){
        $id = !empty($_GET['id'])? $_GET['id'] : '';
        $sql = "SELECT * FROM $table_name WHERE buyer_id=$id ORDER BY id";

        $result = $mysqli->query($sql);
        if ($result) {
            $output = ["records"=>[]];
            $object = new stdClass();
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                array_push($output["records"],$rs);
            }
            $object = json_encode($output);
            echo $object;
        } else {
            echo "Error: " . $sql . "<br>" . $mysqli->error;
        }

    }else{

    $num_rows = $mysqli->query("SELECT transaction_data FROM ($table_name) GROUP BY transaction_data")->num_rows;
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

/*
    $sql = "SELECT `transaction_data`, sector_id, 
    SUM(IF(sector_id = 1, cash,0)) AS stone, 
    SUM(IF(sector_id = 2, cash,0)) AS tomtom, 
    SUM(IF(sector_id = 3, cash,0)) AS mistri,
    SUM(IF(sector_id = 4, cash,0)) AS manager, 
    SUM(IF(sector_id = 5, cash,0)) AS malik, 
    SUM(IF(sector_id = 6, cash,0)) AS office, 
    SUM(IF(sector_id = 7, cash,0)) AS eating,
    SUM(IF(sector_id = 8, cash,0)) AS guest, 
    SUM(IF(sector_id = 9, cash,0)) AS dan, 
    SUM(IF(sector_id = 10, cash,0)) AS lebar, 
    SUM(IF(sector_id = 11, cash,0)) AS rent, 
    SUM(IF(sector_id = 12, cash,0)) AS others, 
    SUM(cash) AS total FROM `expenses` WHERE transaction_data LIKE '$filter' GROUP BY transaction_data ORDER BY $order DESC LIMIT $page, $limit";
*/
    $sql = "
            SELECT transaction_data, sector_id,  
                SUM(IF(sector_id = 1, cash,0)) AS stone,
                SUM(IF(sector_id = 2, cash,0)) AS tomtom, 
                SUM(IF(sector_id = 3, cash,0)) AS mistri,
                SUM(IF(sector_id = 4, cash,0)) AS manager, 
                SUM(IF(sector_id = 5, cash,0)) AS malik, 
                SUM(IF(sector_id = 6, cash,0)) AS office, 
                SUM(IF(sector_id = 7, cash,0)) AS eating,
                SUM(IF(sector_id = 8, cash,0)) AS guest, 
                SUM(IF(sector_id = 9, cash,0)) AS dan, 
                SUM(IF(sector_id = 10, cash,0)) AS lebar, 
                SUM(IF(sector_id = 11, cash,0)) AS rent, 
                SUM(IF(sector_id = 12, cash,0)) AS others, 
                SUM(cash) AS total from
            (
            SELECT ex.transaction_data, ex.sector_id as sector_id, ex.cash FROM `expenses_test` ex
            union
            SELECT sl.transaction_data, 1 as sector_id, sl.cash FROM sales sl
            ) t
            WHERE transaction_data LIKE '$filter' 
            GROUP BY transaction_data ORDER BY $order DESC LIMIT $page, $limit
    ";
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
}
}elseif($method == 'DELETE'){
    $table_name = !empty($_GET["table_name"])? $_GET["table_name"] : $_GET["tableName"];
    $id = !empty($_GET['id'])? $_GET['id'] : '';
    $sql = "DELETE FROM $table_name WHERE id=$id";

    if ($mysqli->query($sql) === TRUE) {
        echo "true";
    } else {
        echo "Error deleting record: " . $mysqli->error;
    }
}elseif($method === 'POST'){
    // if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)){
        $_POST = json_decode(file_get_contents('php://input'), true);
    // }
    function post($var)
    {
        return $intLat = !empty($_POST[$var]) ? $_POST[$var] : "NULL";
    }
    // $data_of_registration = date('Y-m-d H:i:s');
    $transaction_data = !empty($_POST["transaction_data"]) ? date("Y-m-d H:i:s", strtotime($_POST["transaction_data"])) : date("Y-m-d H:i:s");
    $receipt_no = post("receipt_no");
    $sector_id = post("sector_id");
    $buyer_id = post("buyer_id");
    $cash = post("cash");

    $sql = "INSERT INTO expenses (`transaction_data`, `receipt_no`,`sector_id`, `buyer_id`, `cash`)
            VALUES ('{$transaction_data}', $receipt_no, {$sector_id}, {$buyer_id}, $cash)";

    if ($mysqli->query($sql) === TRUE) {
        return true;
//    return true;
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }
}

$mysqli->close();

?>