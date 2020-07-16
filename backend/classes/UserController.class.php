<?php

include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

class UserController extends Dbh
{
    private $paramString;
    private $user;

    public function __construct($paramString)
    {
        $this -> paramString = $paramString;
        $this -> user = new User();
    }

    public function processRequest()
    {
        switch($this -> paramString)
        {
            case 'login':
                $response = $this->checkIfUserExistsAndGenerateJwt();
                break;
            case 'signup':
                {
                    //echo "\n"."entered switch case";
                    $response = $this->createUser();
                }
                break;
            default :
                {
                    $response = $this->responseNotFound();
                }
                break;
        }
        header($response['status_code_header']);
        if($response['body'])
        {
            echo json_encode($response['body']);
        }
    }

    private function checkIfUserExistsAndGenerateJwt()
    {
            $input = (array) json_decode(file_get_contents('php://input'),TRUE);
            if(! $this->isValidEvent($input))
            {
                return $this->unprocessableEntityResponse();
            }
            else{
                $res=$this->user->checkIfEmailExists($input['userName']);
                $issue_date = time();
                $notBeforeValid = $issue_date;
                $expiry_date = $issue_date + 30;
                if($res && password_verify($input['password'], $res['password']))
                {
                    $token = array(
                        "iss" => "http://example.org",
                        "aud" => "http://example.com",
                        "iat" => $issue_date,
                        "nbf" => $notBeforeValid,
                        "exp" => $expiry_date,
                        "data" => array(
                            "email" => $res['userName']
                        )
                        );

                        $jwt = JWT::encode($token,"example_key");
                        $response['body'] = array(
                                "message" => "Successful Login",
                                "jwt" => $jwt
                            );

                        $response['status_code_header'] = "HTTP/1.1 200";
                    
                        return $response;           
                }
                else
                {
                    $response['status_code_header'] = "HTTP/1.1 401";
                    $response['body']="Login failed";
                    return $response;
                }
                
                
            }
    }

    private function createUser()
    {
        $input = (array) json_decode(file_get_contents('php://input'),TRUE);
        if(! $this->isValidEvent($input))
        {
            return $this->unprocessableEntityResponse();
        }
        else{

            if(!$this->user->checkIfEmailExists($input['userName']))
            {
                $this->user->createUser($input);
                $response['status_code_header'] = "HTTP/1.1 201 Created";
                $response['body'] = null;
                return $response;
            }
            else
            {
                $response['status_code_header'] = "HTTP/1.1 404 CANNOT CREATE";
                $response['body'] = 'User with the email already exists !!! Please Login or try another User Name';
                return $response;
            }

            
        }
    }
    private function isValidEvent($input)
    {
        //var_dump(empty($input['userName']));
        if((! isset($input['userName'])) ||  empty($input['userName']))
        {
            return false;
        }
        if(! isset($input['password']) || empty($input['password']))
        {
            return false;
        }
        return true;
    }

    private function unprocessableEntityResponse()
    {
        $response['status_code_header'] = "HTTP/1.1 422 Unprocessable Entity";
        $response['body'] = "Invalid Input";
        return $response;
    }

    private function responseNotFound()
    {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = "The operation is unsuccessful";
        return $response;
    }

}