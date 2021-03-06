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

    $sql = "SELECT * FROM ($table_name) WHERE name LIKE '$filter' ORDER BY $order LIMIT $page, $limit";
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
    $id = !empty($_GET['id'])? $_GET['id'] : '';
    // $sql = "DELETE FROM $table_name WHERE id=$id";
    $sellers_sql = "DELETE FROM sellers WHERE id=$id";
    $incomes_sql = "DELETE FROM incomes WHERE seller_id=$id";
    $buys_sql = "DELETE FROM buys WHERE seller_id=$id";
    if ($mysqli->query($sellers_sql) === TRUE) {
        if ($mysqli->query($incomes_sql) === TRUE) {
            if ($mysqli->query($buys_sql) === TRUE) {
                echo "true";
            } else {
            echo "Error deleting record: " . $mysqli->error."SQL QUERY:".$buys_sql;
            }
        } else {
        echo "Error deleting record: " . $mysqli->error."SQL QUERY:".$incomes_sql;
        }
    } else {
        echo "Error deleting record: " . $mysqli->error."SQL QUERY:".$sellers_sql;
    }
}elseif($method === 'POST'){
    // if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)){
        $_POST = json_decode(file_get_contents('php://input'), true);
    // }
    function post($var)
    {
        return $intLat = !empty($_POST[$var]) ? $_POST[$var] : "NULL";
    }
    $id = post("id");
    $name = post("name");
    $account_no = post("account_no");
    if($id != "NULL"){
        // $id = !empty($_GET['id'])? $_GET['id'] : '';
        $sql = "UPDATE sellers SET `name`='{$name}'
            WHERE `account_no`='{$account_no}'";
    }
    else
    {
    $sql = "INSERT INTO sellers (`account_no`, `name`)
            VALUES ('{$account_no}', '{$name}')";
    }
    if ($mysqli->query($sql) === TRUE) {
        return true;
//    return true;
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }
}

$mysqli->close();

?>