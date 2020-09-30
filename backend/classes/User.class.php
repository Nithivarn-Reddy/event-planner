<?php

class User extends Dbh{
    function createUser(Array $input){
        $sql = "insert into users(userName,password) values(?,?)";
        try{
            $stmt = $this->connect()->prepare($sql);
            $val = $stmt->execute([$input['userName'],password_hash($input['password'],PASSWORD_BCRYPT)]);
           }
           catch(PDOException $e)
           {
                exit($e->getMessage());
           }
    }

    function checkIfUserNameExists($userName)
    {
        $sql = "select * from users where userName=?";
        try{
            $stmt = $this->connect()->prepare($sql);
            $stmt->execute([$userName]);
            $rows = $stmt->fetch();
            if($rows)
            {
                return $rows;
            }
            return false;
        }
        catch(PDOException $e)
        {
             exit($e->getMessage());
        }
    }
}