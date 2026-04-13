<html>
<?php
session_start();
$servername = "10.0.19.74";
$username = "mad01540";
$password = "mad01540";
$dbname = "db_mad01540";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_errno) {
  die("Connection failed: " . $conn->connect_error);
}
if($_SERVER["REQUEST_METHOD"]==="POST"){
    
     $name=$_POST["recipeName"];
     $ingre=$_POST["ingredients"];
     $instructions=$_POST["instructions"];
     $type=$_POST["type"];
    

 $stmt= $conn->prepare("INSERT INTO  recipes (name,instructions,ingredients,type) values(?,?,?,?)");
 $stmt->bind_param("ssss",$name,$instructions,$ingre,$type);
  
    if($stmt->execute()){
        $_SESSION["success"] = "added  successfuly";
         echo "<script>alert('".$_SESSION['success']."');</script>";
        header("location: ../index.php");
    }
    else{
        $_SESSION["error"] = "cannot upload recipe ";
       
        header("location: ../index.php");
    }

    }
    else{

        echo "error";
    }

?>
</html>