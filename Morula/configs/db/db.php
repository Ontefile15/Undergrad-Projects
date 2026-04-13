<?php
$servername = "10.0.19.74";
$username = "mad01540";
$password = "mad01540";
$dbname = "db_mad01540";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

?>