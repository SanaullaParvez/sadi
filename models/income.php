<?php
include_once 'setup.php';
$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'GET'){
    $table_name = !empty($_GET["table_name"])? $_GET["table_name"] : $_GET["tableName"];
    if(!empty($_GET['id'])){
            $id = !empty($_GET['id'])? $_GET['id'] : '';
            //$sql = "SELECT * FROM $table_name WHERE seller_id=$id ORDER BY id";
            $sql = "
                    SELECT ic.transaction_data AS transaction_data,0 AS amount,ic.cash 
                    from incomes AS ic where ic.seller_id = $id
                    UNION
                    (
                    select bu.transaction_data AS transaction_data,bu.amount AS amount,bu.cash 
                    from buys AS bu 
                    where bu.seller_id = $id 
                    ) 
                    ORDER BY transaction_data;
            ";
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

        // $sql = "SELECT incomes.id AS id,receipt_no,transaction_data,sellers.name AS seller_name, amount, cash FROM ($table_name) INNER JOIN sellers ON sellers.account_no = incomes.seller_id WHERE transaction_data LIKE '$filter' ORDER BY $order DESC LIMIT $page, $limit";
        $sql = "SELECT ic.receipt_no,ic.transaction_data,sellers.name AS seller_name,ic.cash 
            from incomes ic 
            inner join sellers on sellers.id = ic.seller_id 
            WHERE transaction_data LIKE '$filter'
            union 
            (
                SELECT bu.receipt_no,bu.transaction_data,sellers.name AS seller_name,bu.cash 
                from buys bu
                inner join sellers on sellers.id = bu.seller_id
                WHERE transaction_data LIKE '$filter'
            ) ORDER BY $order DESC LIMIT $page, $limit;
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
    $seller_id = post("seller_id");
    $cash = post("cash");

    $sql = "INSERT INTO incomes (`transaction_data`, `receipt_no`, `seller_id`, `cash`)
            VALUES ('{$transaction_data}', $receipt_no, '{$seller_id}', $cash)";

    if ($mysqli->query($sql) === TRUE) {
        return true;
//    return true;
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }
}

$mysqli->close();

?>