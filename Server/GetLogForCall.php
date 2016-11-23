<?
include ("db_xmas.inc");
ini_set('display_errors',1);
error_reporting(E_ALL);
header('Content-type: application/json');

// get the POST variable
$info = $_POST ["info"];

// extract all the properties of the request
if (isset ( $info ['call'] )) {
	$call = $info ['call'];
	$result = mysql_query("select `my_call`,`my_square`,`mode`,`frequency`,`callsign`,`timestamp`,`rst_sent`,`rst_rcvd` from log where `callsign` = '$call' order by `timestamp` desc") or die('Error: ' . mysql_error());
} 
else 
{
	$result = '';
}
while($obj = mysql_fetch_object($result)) {
$res[] = $obj;
}
echo json_encode($res);
?>

