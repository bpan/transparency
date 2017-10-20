<?php
/*
 * Description: 
 * 
 * Notes: 
 * 
 * 05/12/2008 BP  Original page
 *
 */

if (!isset($_REQUEST['action'])) {
	$_REQUEST['action'] = 'main_view';
} else if ($_REQUEST['action'] == 'edit_song_form' && !isset($_REQUEST['title'])) {
	$_REQUEST['action'] = 'add_song_form';
}

switch ($_REQUEST['action']) {
	case 'add_song':
		$filename = "";
		$lyrics = "";
		
		if (!isset($_REQUEST['title']) || !preg_match("/\S/", $_REQUEST['title'])) {
			echo "<script>alert('ERROR: Missing song title!'); window.history.go(-1);</script>";
		} else if (!isset($_REQUEST['lyrics']) || !preg_match("/\S/", $_REQUEST['lyrics'])) {
			echo "<script>alert('ERROR: Missing song lyrics!'); window.history.go(-1);</script>";
		} else {
			$filename = preg_replace("/^\s+/", "", $_REQUEST['title']);
			$filename = preg_replace("/\s+$/", "", $filename);
			$filename = preg_replace("/\s+/", " ", $filename);
			$lyrics = str_replace("\'", "’", $_REQUEST['lyrics']);
			
			$handle = file_put_contents("songs/new/" . $filename . ".txt", $lyrics . "\n");
			if (!$handle) {
				echo "ERROR: add_song: Could not create file" . $_REQUEST['title'];
			} else {
				$_REQUEST['action'] = 'browse_all';
				include("index.php");
			}
		}
		break;
	case 'add_song_form':
		$pageTitle = "Add a Song";
		include("add_song_form.html");
		break;
	case 'edit_song_form':
		$pageTitle = "Edit Song";
		
		$filename = "songs/new/" . str_replace("\\", "", $_REQUEST['title']) .".txt";
		$lyrics = file_get_contents($filename);
		
		include("add_song_form.html");
		break;
	case 'browse_all':
		print <<<HEADER
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
 "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Browse All Songs</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<link rel="stylesheet" type="text/css" href="controller.css">
</head>

<body>
HEADER;
		$songNames = scandir('songs/new');
		echo "<h2>New Songs</h2>";
		echo "<ul id='allSlides'>";
		foreach ($songNames as $filename) {
			if ($filename[0] != '.' && is_file("songs/new/" . $filename)) {
				$title = str_replace(".txt", "", $filename);
				echo "<li>[<a href='index.php?action=edit_song_form&title="
					. urlencode($title) . "'>edit</a>] <a href='index.php?action=browse_song&song_id=new/"
					. urlencode($title) . "'>" . $title . "</a>";
			}
		}
		echo "</ul>";
		
		$songNames = scandir('songs');
		echo "<h2>Song Library</h2>";
		echo "<ul id='allSlides'>";
		foreach ($songNames as $filename) {
			if ($filename[0] != '.' && is_file("songs/" . $filename)) {
				$title = str_replace(".txt", "", $filename);
				echo "<li><a href='index.php?action=browse_song&song_id="
					. urlencode($title) . "'>" . $title . "</a>";
			}
		}
		echo "</ul>";
		break;
	case 'find_title':
		$songNames = scandir('songs');
		$newSongNames = scandir('songs/new');
		$searchTerm = preg_replace('/[^a-z0-9 ]/i','', $_REQUEST['q']);		
		$searchOutput = "";
		$firstVerse = false;
		
		foreach ($newSongNames as $filename) {
			if (preg_match("/^{$searchTerm}/i", preg_replace('/[^a-zA-Z0-9 ]/i','',$filename))) {
				$handle = @fopen("songs/new/" . $filename, "r");
				$searchOutput = "new/" . str_replace(".txt", "", $filename);
				$searchOutput .= "<br><span class='preview'>";
				$firstVerse = false;
				if ($handle) {
					while (!feof($handle)) {
						$buffer = fgets($handle);
						if (preg_match("/(^V[0-9]*\s*$)|(^C[0-9]*\s*$)/", $buffer)) {
							// Ignore V# or C# on a line
						} else if (preg_match("/\S/", $buffer)) {
							if ($firstVerse) {
								$searchOutput .= "<br>";
							} else {
								$firstVerse = true;
							}
							$searchOutput .= "&nbsp;" . rtrim($buffer);
						} else {
							if ($firstVerse) {
								$searchOutput .= "</span>|" . "new/" . str_replace(".txt", "", $filename) . "\n";
								echo $searchOutput;
								break;
							}
						}
					}
				} else { echo $handle . " error: " . $filename . "\n"; }
				//echo str_replace(".txt", "", $filename) . "\n";
			}
		}
		foreach ($songNames as $filename) {
			if (preg_match("/^{$searchTerm}/i", preg_replace('/[^a-zA-Z0-9 ]/i','',$filename))) {
				$handle = @fopen("songs/" . $filename, "r");
				$searchOutput = str_replace(".txt", "", $filename);
				$searchOutput .= "<br><span class='preview'>";
				$firstVerse = false;
				if ($handle) {
					while (!feof($handle)) {
						$buffer = fgets($handle);
						if (preg_match("/(^V[0-9]*\s*$)|(^C[0-9]*\s*$)/", $buffer)) {
							// Ignore V# or C# on a line
						} else if (preg_match("/\S/", $buffer)) {
							if ($firstVerse) {
								$searchOutput .= "<br>";
							} else {
								$firstVerse = true;
							}
							$searchOutput .= "&nbsp;" . rtrim($buffer);
						} else {
							if ($firstVerse) {
								$searchOutput .= "</span>|" . str_replace(".txt", "", $filename) . "\n";
								echo $searchOutput;
								break;
							}
						}
					}
				} else { echo $handle . " error: " . $filename . "\n"; }
				//echo str_replace(".txt", "", $filename) . "\n";
			}
		}
		foreach ($songNames as $filename) {
			if (preg_match("/.{$searchTerm}/i", preg_replace('/[^a-zA-Z0-9 ]/i','',$filename))) {
				$handle = @fopen("songs/" . $filename, "r");
				$searchOutput = str_replace(".txt", "", $filename);
				$searchOutput .= "<br><span class='preview'>";
				$firstVerse = false;
				if ($handle) {
					while (!feof($handle)) {
						$buffer = fgets($handle);
						if (preg_match("/(^V[0-9]*\s*$)|(^C[0-9]*\s*$)/", $buffer)) {
							// Ignore V# or C# on a line
						} else if (preg_match("/\S/", $buffer)) {
							if ($firstVerse) {
								$searchOutput .= "<br>";
							} else {
								$firstVerse = true;
							}
							$searchOutput .= "&nbsp;" . rtrim($buffer);
						} else {
							if ($firstVerse) {
								$searchOutput .= "</span>|" . str_replace(".txt", "", $filename) . "\n";
								echo $searchOutput;
								break;
							}
						}
					}
				} else { echo $handle . " error: " . $filename . "\n"; }

				//echo str_replace(".txt", "", $filename) . "\n";
			}
		}
		
		break;
	case 'browse_song':
		$title = str_replace("\\", "", $_REQUEST['song_id']);
		print <<<HEADER
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
 "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Browse Song - {$title}</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<link rel="stylesheet" type="text/css" href="controller.css">
</head>

<body>
HEADER;
	case 'load_song':
		$filename = "";
		$handle = 0;
		$buffer = "";
		$title = "";
		$verseNum = 1;
		$foundEnd = false;
		
		if (!isset($_REQUEST['song_id'])) {
			echo "ERROR: load_song: Missing song id";
		} else {
			//$_REQUEST['song_id'] = str_replace("%20", " ", $_REQUEST['song_id']);
			$_REQUEST['song_id'] = str_replace("\\", "", $_REQUEST['song_id']);
			$filename = "songs/" . Trim($_REQUEST['song_id']) .".txt";
			//readfile($filename);
			$handle = @fopen($filename, "r");
			if (!$handle) {
				echo "ERROR: load_song: '{$_REQUEST['song_id']}' not found";
			} else {
				$title = preg_replace("/^new\//", "", $_REQUEST['song_id']);
				$title = preg_replace("/\(.*\)/", "", $title);
				echo "<h4>" . $title . "</h4>\n\n";
				echo "<div id=\"top\" class=\"verse\">\n";
				echo "<div class=\"verseNum\">" . $verseNum++ . "</div>";
				echo "<div class=\"versePad\">\n";
				while (!feof($handle)) {
					$buffer = fgets($handle);
					if (preg_match("/(^V[0-9]*\s*$)|(^C[0-9]*\s*$)/", $buffer)) {
						// Ignore V# or C# on a line
					} else if (preg_match("/\S/", $buffer)) {
						if ($foundEnd) {
							echo "</div>\n</div>\n\n";
							echo "<div class=\"verse\">\n";
							echo "<div class=\"verseNum\">" . $verseNum++ . "</div>";
							echo "<div class=\"versePad\">\n";
							$foundEnd = false;
						}
						echo rtrim($buffer) . "<br>\n";
					} else {
						$foundEnd = true;
					}
				}
				echo "</div>\n</div>\n";
			}
		}
		break;
	case 'main_view':
		include('index.html');
		break;
}

?>