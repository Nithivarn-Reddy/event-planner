<?php

class Events extends Dbh{
    public function getEvents()
    {
        $sql = "SELECT * FROM Events";
        $stmt = $this->connect()->query($sql);
        $result = $stmt->fetchAll();
        return $result;
    }

    public function getEvent($eventId)
    {
        $sql = "SELECT * FROM Events WHERE id=?";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute([$eventId]);
        $rows = $stmt->fetchAll();
        return $rows;
        
    }

    public function insertEvent(Array $input)
    {
        $sql = "INSERT INTO Events(title,description,date_time) VALUES (?,?,?)";
       try{
        $stmt = $this->connect()->prepare($sql);
        $date = new DateTime($input['date_time']);
        $formatted_date = $date->format('Y-m-d H:i:s');
        $val = $stmt->execute([$input['title'],$input['description'],$formatted_date]);
       }
       catch(PDOException $e)
       {
            exit($e->getMessage());
       }
    }

    public function updateEvent($eventId,Array $input)
    {
        $sql ="update Events set title=?,description=?,date_time=? where id=?";
       try{
        $stmt = $this->connect()->prepare($sql);
        $date = new DateTime($input['date_time']);
        $formatted_date = $date->format('Y-m-d H:i:s');
        $val = $stmt->execute([$input['title'],$input['description'],$formatted_date,$eventId]);
       }
       catch(PDOException $e)
       {
            exit($e->getMessage());
       }
    }

    public function deleteEvent($eventId)
    {
        $sql = "DELETE FROM Events WHERE id=?";
        try
        {
            $stmt = $this->connect()->prepare($sql);
            $stmt->execute([$eventId]);
        }
        catch(PDOException $e)
        {
            exit($e->getMessage());
        }
    }
}