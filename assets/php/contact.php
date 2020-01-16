<?php
  if(isset($_POST['submit'])){
    $name = htmlspecialchars(stripslashes(trim($_POST['name'])));
    $subject = htmlspecialchars(stripslashes(trim($_POST['subject'])));
    $email = htmlspecialchars(stripslashes(trim($_POST['email'])));
    $message = htmlspecialchars(stripslashes(trim($_POST['message'])));
    if(!preg_match("/^[A-Za-z .'-]+$/", $name)){
      $name_error = 'Invalid name';
    }
    if(!preg_match("/^[A-Za-z .'-]+$/", $subject)){
      $subject_error = 'Invalid subject';
    }
    if(!preg_match("/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/", $email)){
      $email_error = 'Invalid email';
    }
    if(strlen($message) === 0){
      $message_error = 'Your message should not be empty';
    }
  }
?>

<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST">
   <div class="row gtr-uniform gtr-50">
		<div class="col-6 col-12-xsmall"><input type="text" name="name" id="name" placeholder="Name" required/><p><?php if(isset($name_error)) echo $name_error; ?></p></div>
		<div class="col-6 col-12-xsmall"><input type="email" name="email" id="email" placeholder="Email" required/><p><?php if(isset($email_error)) echo $email_error; ?></p></div>
		<div class="col-12"><textarea name="message" id="message" placeholder="Message" rows="4" required></textarea><p><?php if(isset($message_error)) echo $message_error; ?></p></div>		
		<ul class="actions">
			<li><input type="submit" value="Send Message" /></li>
		</ul>
	</div>
	<?php 
	 if(isset($_POST['submit']) && !isset($name_error) && !isset($subject_error) && !isset($email_error) && !isset($message_error)){
		$to = 'junsu852@gmail.com'; // edit here
		$body = " Name: $name\n E-mail: $email\n Message:\n $message";
		if(mail($to, $subject, $body)){
		  echo '<p style="color: green">Message sent</p>';
		}else{
		  echo '<p>Error occurred, please try again later</p>';
		}
	 }
	?>
</form>