<?php
include_once 'setup.php';
// $id = !empty($_GET['id'])? $_GET['id'] : '';
$sql = "
SELECT inc_exp.transaction_data,SUM(inc_exp.income_cash) as income,SUM(inc_exp.expense_cash) as expense
from
(
SELECT ic.transaction_data,ic.cash as income_cash,0 as expense_cash FROM incomes ic
union
SELECT bu.transaction_data,bu.cash as income_cash,0 expense_cash from buys bu 
union 
SELECT ex.transaction_data,0 as income_cash,ex.cash as expense_cash  FROM expenses ex
union
SELECT sa.transaction_data,0 as income_cash,sa.cash as expense_cash  from sales AS sa
) inc_exp
GROUP BY inc_exp.transaction_data
ORDER BY inc_exp.transaction_data ASC;
";
// $sql = "SELECT * FROM $table_name WHERE buyer_id=$id ORDER BY id";

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

$mysqli->close();

?>