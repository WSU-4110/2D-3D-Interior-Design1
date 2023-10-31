<?php
class Review{

    public $email;
    public $rev;

    public function __construct($email, $rev){
    $this->email = $email;
    $this->rev = $rev;
}
    function set_email($email)
     { $this->email = $email; }

     function get_email(){
         return $this->email; }

     function set_rev($rev)
     { $this->rev = $rev; }

     function get_rev()
     { return $this->rev; }
}
?>