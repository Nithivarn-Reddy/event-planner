<?php

include "includes/autoloader.inc.php";
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;
?>

<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH);
$uri = explode( '/', $uri );

    try{
        
        if($uri[3] !== 'event' && $uri[3] !== 'login' && $uri[3] !== 'signup' && $uri[3] !== 'validate')
        {
            header("HTTP/1.1 404 Not Found");
            exit();
        }

        $eventId=null;
        if(isset($uri[4]))
        {
            $eventId = (int)$uri[4];
        }

        $requestMethod = $_SERVER["REQUEST_METHOD"];

       

        function isAuthenticated()
        {
            try
            {
                $authHeader = getAuthorizationHeaderValue($_SERVER);
                preg_match('/Bearer\s(\S+)/', $authHeader, $matches);
                if(!isset($matches[1])) {
                        throw new Exception('No Bearer Token');
                }
                $jwt = $matches[1];
                return isValidToken($jwt);
            }
            catch (Exception $e)
            {
                return false;
            }
        }


        function keyExists($key,$array)
        {
            return array_key_exists($key, $array);
        }

        function getAuthorizationHeaderValue($array)
        {
            switch(true) {
                case keyExists('HTTP_AUTHORIZATION', $array) :
                    $authHeader = $array['HTTP_AUTHORIZATION'];
                    break;
                case keyExists('Authorization', $_SERVER) :
                    $authHeader = $array['Authorization'];
                    break;
                default :
                    $authHeader = null;
                    break;
                }
                return $authHeader;
        }
        
        function isValidToken($jwt)
        {
            try
            {
                $decoded = JWT::decode($jwt,"example_key",array('HS256'));
                return true;
                    
            }
            catch (Exception $e)
            {
                header("HTTP/1.1 401 Unauthorized");
                exit(json_encode(array("error"=>$e->getMessage())));
                return false;
            }
        }

        //isAuthenticated();
        //echo ("date in string format") . ($input['date_time']);
        //$format = 'Y-m-d';
        //$date = new DateTime($input['date_time']);
        //$date_val = $date->format('Y-m-d H:i:s');
        //print_r(gettype($date));

        //echo $requestMethod;
        if($uri[3] == 'event')
        {
            
            if(! isAuthenticated())
            {
                header("HTTP/1.1 401 Unauthorized");
                exit('Unauthorized');
            }
            
            $eventController = new EventsController($requestMethod,$eventId);
            $eventController->processRequest();
        }
        else if($uri[3] == 'validate')
        {
            
            if(! isAuthenticated())
            {
                header("HTTP/1.1 401 Unauthorized");
                exit('Unauthorized');
            }
        }
        else
        {
            
            $userController = new UserController(strval($uri[3]));
            $userController->processRequest();
        }

    }
    catch(Exception $e)
    {
        echo $e;
    }
    
    ?>
