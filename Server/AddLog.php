<?
include ("db_xmas.inc");
ini_set('display_errors',1);
error_reporting(E_ALL);
header('Content-type: application/json');

// get the POST variable
$insertlog = $_POST ["insertlog"];

// extract all the properties of the request
$result = mysql_query($insertlog) or die('Error: ' . mysql_error());
echo json_encode('Log added!');

?>