


<?php 
include ("SignUp.php");
class signupTest extends \PHPUnit\Framework\TestCase{


    


              /**@test */
    public function testSuccessfulSignup()
    {
        $signup = new SignUp('John Doe', 'john@example.com', 'password123');
    
        $result = $signup->signup();
    
        $this->assertTrue($result);
    
        print("\nexpected: John Doe john@example.com password123"); 
        print("\nactual: " . $signup->get_name() . ' ' . $signup->get_email() . ' ' . $signup->get_pass());
    }

    /** @test */
       public function it_gets_email(){
        $SignUp = new SignUp("name", "email@get.com", "pass");
        $this->assertEquals("email@get.com", $SignUp->get_email());

        
        print("\nexpected: email@get.com"); 
        
        print("\nactual: "); print($SignUp->get_email());
    }

    /** @test */
          public function it_gets_name(){
            $SignUp = new SignUp("Got name", "email@get.com", "pass");
            $this->assertEquals("Got name", $SignUp->get_name());
    
            print("\n");
            print("expected: Got name"); 
            print("\n");
            print("actual: "); print($SignUp->get_name());
        }

        /** @test */
               public function it_gets_pass(){
                $SignUp = new SignUp("name", "email@get.com", "Got password");
                $this->assertEquals("Got password", $SignUp->get_pass());
        
                print("\n");
                print("expected: Got password"); 
                print("\n");
                print("actual: "); print($SignUp->get_pass());
            }


    /** @test */
    public function it_sets_email(){
        $SignUp = new SignUp("name","email@set.com", "pass");
        $expectedEmail = "email@set.com";
        $SignUp-> set_email("email@set.com");
        $this->assertEquals("$expectedEmail", $SignUp->get_email());

        print("\n");
        print("expected: "); print($expectedEmail);
        print("\n");
        print("actual: "); print($SignUp->get_email());
        
    }

        /** @test */
        public function it_sets_name(){
                    $SignUp = new SignUp("Set name","email@set.com", "pass");
                    $expectedName = "Set name";
                    $SignUp-> set_name("Set name");
                    $this->assertEquals("$expectedName", $SignUp->get_name());
            
                    print("\n");
                    print("expected: "); print($expectedName);
                    print("\n");
                    print("actual: "); print($SignUp->get_name());
                    
                }

        /** @test */
        public function it_sets_pass(){
                    $SignUp = new SignUp("name","email@set.com", "Set pass");
                    $expectedPass = "Set pass";
                    $SignUp-> set_pass("Set pass");
                    $this->assertEquals("$expectedPass", $SignUp->get_pass());
            
                    print("\n");
                    print("expected: "); print($expectedPass);
                    print("\n");
                    print("actual: "); print($SignUp->get_pass());
                    
                }
               

}
