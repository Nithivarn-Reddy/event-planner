<?php

spl_autoload_register('myAutoLoader');
//spl_autoload_register('libraryLoader');

function myAutoLoader($className)
{
    $path = "classes/";
    $extension = ".class.php";
    $filename= $path . $className . $extension;
    //echo $filename;
    if(!file_exists($filename))
    {
        return false;
    }
    include_once $filename;
}

function libraryLoader($className)
{
    $path = "libs/php-jwt-master/src/";
    $extension = ".php";
    $filename = $path . $className . $extension;
    //echo $filename1;
    if(!file_exists($filename))
    {
        return false;
    }
    include_once $filename;
}