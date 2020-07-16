<?php

class EventsController extends Dbh
{
    private $requestMethod;
    private $eventId;

    private $event;

    public function __construct($requestMethod,$eventId)
    {
        $this -> requestMethod = $requestMethod;
        $this -> eventId = $eventId;
        $this -> event = new Events();
    }

    public function processRequest()
    {
        switch ($this -> requestMethod)
        {
            case 'GET':
                if($this->eventId)
                {
                    $response = $this->getEvent($this->eventId);
                }
                else
                {
                    $response = $this->getAllEvents();
                }
                break;
            case 'POST':
                $response = $this->insertEvent();
                break;
            case 'PUT':
                $response = $this->updateEvent($this->eventId);
                break;
            case 'DELETE':
                $response =$this->deleteEvent($this->eventId);
                break;
            default:
                $response = $this->responseNotFound();
                break;

        }
        header($response['status_code_header']);
        if($response['body'])
        {
            echo json_encode($response['body']);
        }
    }
    private function getEvent($eventId)
    {
        $result =  $this->event->getEvent($eventId);
        if(! $result)
        {
           return $this->responseNotFound();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = $result;
        return $response;
    }

    private function getAllEvents()
    {
        $result = $this->event->getEvents();
        if(! $result)
        {
            return $this->responseNotFound();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = $result;
        return $response;
    }
    private function insertEvent()
    {
        $input = (array) json_decode(file_get_contents('php://input'),TRUE);
        if(! $this->isValidEvent($input))
        {
            return $this->unprocessableEntityResponse();
        }
        else{
            $this->event->insertEvent($input);
            $response['status_code_header'] = "HTTP/1.1 201 Created";
            $response['body'] = null;
            return $response;
        }
    }
    private function updateEvent($eventId)
    {
        $result = $this->event->getEvent($eventId);
        if(! $result)
        {
            return $this->responseNotFound();  
        }
        $input = (array) json_decode(file_get_contents('php://input'),TRUE);
        if(! $this->isValidEvent($input))
        {
            return $this->unprocessableEntityResponse();
        }
        else
        {
            $this->event->updateEvent($eventId,$input);
            $response['status_code_header'] = "HTTP/1.1 200 OK";
            $response['body'] = null;
            return $response;
        }
    }
    private function deleteEvent($eventId)
    {
        $result = $this->event->getEvent($eventId);
        if(! $result)
        {
            return $this->responseNotFound();  
        }
        else
        {
            $this->event->deleteEvent($eventId);
            $response['status_code_header'] = "HTTP/1.1 200 OK";
            $response['body'] = null;
            return $response;
        }
        
    }
    private function isValidEvent($input)
    {
        if(! isset($input['title']) || empty($input['title']))
        {
            return false;
        }
        if(! isset($input['description']) || empty($input['description']))
        {
            return false;
        }
        if(! isset($input['date_time']) || empty($input['date_time']))
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