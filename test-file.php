<?php
$file = "items.json";

// Open the file for reading
$handle = fopen($file, "r") or die("ERROR: Cannot open the file");

// Reading the entire file
$content = fread($handle, filesize($file));

// Closing the file handle
fclose($handle);

// Display the file content
echo  date ("F d Y H:i:s.",filemtime($file));
?>