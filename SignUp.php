<?php

class SignUp{

    public $name;
    public $email;
    public $password;

    public function __construct($name, $email, $password){
    $this->name = $name;
    $this->email = $email;
    $this->password = $password;
    }

    public function signup(){
        if(!empty($this->name)){
            
            return true;
            }else if(!empty($this->email)){
                
                return true;
            }else if(!empty($this->password)){
                
                return true;
            }
            return false;
    }
    function set_email($email)
     { $this->email = $email; }

     function get_email(){
         return $this->email; }

     function set_name($name)
     { $this->name = $name; }

     function get_name()
     { return $this->name; }

     function set_pass($password)
     { $this->password = $password; }

     function get_pass()
     { return $this->password; }
}

?>