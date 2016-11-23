<?
include ("db_xmas.inc");
ini_set('display_errors',1);
error_reporting(E_ALL);
header('Content-type: application/json');

$result = mysql_query("SELECT `my_call`,`my_square`,`mode`,`frequency`,`callsign`,`timestamp`,`rst_sent`,`rst_rcvd`,`exchange`,`comment` FROM log order by `timestamp` desc LIMIT 10") or die('Error: ' . mysql_error());
while($obj = mysql_fetch_object($result)) {
$res[] = $obj;
}
echo json_encode($res);
?>