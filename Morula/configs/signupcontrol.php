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
if($_SERVER["REQUEST_METHOD"]=="POST"){
   if(isset($_POST["firstname"])){
     $firstname=$_POST["firstname"];
     $lastname=$_POST["lastname"];
     $username=$_POST["username"];
     $gender=$_POST["gender"];
     $password=$_POST["password"];
    $pass_hash=password_hash($password,PASSWORD_DEFAULT);

    $stmt= $conn->prepare("INSERT INTO users (username,firstname,lastname,gender,password) values(?,?,?,?,?)");    
    $stmt->bind_param("sssss",$username, $firstname, $lastname, $gender,$pass_hash);
    
 if($stmt->execute()){
    
        $_SESSION["user"] = $username;
        header("Location: ../subscription.php");
    }
    else{
        $_SESSION["signuperror"] = "cannot sign up try again later ";
        header("Location: ../sign-up.php");
    }

    }
else{
    $username=$_POST["username"];
    $password=$_POST["password"];

  
    $grt="select * from users where username='$username'";
    
    $result = $conn->query($grt);
    
    
if ($result->num_rows > 0) {
    
  while($row = $result->fetch_assoc()) 
        $pass= $row["password"];
       
    if(password_verify($password,$pass)){
        $_SESSION["user"] = $username;
        $_SESSION["usertype"] ="premium";
        header("Location: ../subscription.php");

    }
    else{
        $_SESSION["error"] = "cannot log In wrong Password Provided";
        header("Location: ../login.php");
    }
    }
     else{
     $_SESSION["error"] = "cannot log In User does not exist";
        header("Location : ../login.php");

    }
   
}
}



?>
</html>
