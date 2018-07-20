<<?php
  function logToFile($logfile_name, $message) {
    $date_time = date("d.m.Y H:i:s");
    $logfile = "logs/" . date("Ymd") . "_" . $logfile_name;
    $message = array($date_time, $message);
    $line = implode(" ", $message);

    if (!file_exists("logs/") && !is_dir("logs/")) {
        mkdir("logs/");
    }

    $file = fopen($logfile, "a");
    fputs($file, $line . PHP_EOL);
    fclose($file);
  }
?>