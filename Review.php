<?php

class Review{

    public $email;
    public $rev;
    public $name;

    public function __construct($email, $rev, $name){
    $this->email = $email;
    $this->rev = $rev;
    $this->name = $name;
    }
    function set_email($email)
     { $this->email = $email; }

     function get_email(){
         return $this->email; }

     function set_rev($rev)
     { $this->rev = $rev; }

     function get_rev()
     { return $this->rev; }

     function set_name($name)
     { $this->name = $name; }

     function get_name()
     { return $this->name; }
}

?>