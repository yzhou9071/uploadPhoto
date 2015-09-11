<?php
include 'config.php';
$dirname = "background"; 
if ($_FILES) {
	//Get & Save Uploaded Pic
	$phonenum = $_POST["phone"];
	$photoname = $_POST["photoname"];

	mkdir ($dirname, 0777, true);
	move_uploaded_file($_FILES["file"]["tmp_name"],$dirname."/".$photoname.".jpg");

	//Flex Pic
	//define the new size of Pic
	$dst_h = $_POST['height'];
	$dst_w = $_POST['width'];
	//get info of Pic (height & width)
	$src_img = $dirname . "/" . $photoname . ".jpg";
	list($src_w,$src_h)=getimagesize($src_img); 
	$dst_scale = $dst_h/$dst_w;
	$src_scale = $src_h/$src_w; 
	if($src_scale>=$dst_scale) { 
		$w = intval($src_w); 
		$h = intval($dst_scale*$w); 
		$x = 0; 
		$y = ($src_h - $h)/3; 
	} else { 
		$h = intval($src_h); 
		$w = intval($h/$dst_scale); 
		$x = ($src_w - $w)/2; 
		$y = 0; 
	} 
	//Flex
	$source=imagecreatefromjpeg($src_img); 
	$croped=imagecreatetruecolor($w, $h); 
	imagecopy($croped,$source,0,0,$x,$y,$src_w,$src_h); 
	$scale = $dst_w/$w; 
	$target = imagecreatetruecolor($dst_w, $dst_h); 
	$final_w = intval($w*$scale); 
	$final_h = intval($h*$scale); 
	imagecopyresampled($target,$croped,0,0,0,0,$final_w,$final_h,$w,$h); 
	//Save
	imagejpeg($target, $src_img); 
	imagedestroy($target); 
}
?>
