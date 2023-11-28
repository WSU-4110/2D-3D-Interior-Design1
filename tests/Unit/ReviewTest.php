<?php 
include ("Review.php");
class ReviewTest extends \PHPUnit\Framework\TestCase{

    /** @test */
    public function it_constructs_a_review(){
        $review = new Review("hold@hold.com", "hold", "hold");
        $expectedEmail = "test@test.com";
        $expectedRev = "test review";
        $expectedName = "test";

        $review-> __construct("test@test.com","test review","test");
        $this->assertEquals("$expectedEmail", $review->get_email());
        $this->assertEquals("$expectedRev", $review->get_rev());
        $this->assertEquals("$expectedName", $review->get_name());

        print("\n");
        print("expected: "); print($expectedEmail);
        print("\n");
        print("actual: "); print($review->get_email());
        print("\n");
        print("expected: "); print($expectedRev);
        print("\n");
        print("actual: "); print($review->get_rev());
        print("\n");
        print("expected: "); print($expectedName);
        print("\n");
        print("actual: "); print($review->get_name());
    }

    /** @test */
    public function it_sets_email(){
        $review = new Review("hold@hold.com", "hold", "hold");
        $expectedEmail = "test@test.com";
        $review-> set_email("test@test.com");
        $this->assertEquals("$expectedEmail", $review->get_email());

        print("\n");
        print("expected: "); print($expectedEmail);
        print("\n");
        print("actual: "); print($review->get_email());
        
    }

    /** @test */
    public function it_gets_email(){
        $review = new Review("get@test.com", "hold", "hold");
        $this->assertEquals("get@test.com", $review->get_email());

        print("\n");
        print("expected: get@test.com"); 
        print("\n");
        print("actual: "); print($review->get_email());
    }

        /** @test */
        public function it_sets_rev(){
            $review = new Review("hold@hold.com", "hold", "hold");
            $expectedRev = "test review";
    
            $review-> set_rev("test review");
            $this->assertEquals("$expectedRev", $review->get_rev());

            
        print("\n");
        print("expected: "); print($expectedRev);
        print("\n");
        print("actual: "); print($review->get_rev());
        }
    
        /** @test */
        public function it_gets_rev(){
            $review = new Review("hold@hold.com", "get review", "hold");
            $this->assertEquals("get review", $review->get_rev());

            print("\n");
            print("expected: get review"); 
            print("\n");
            print("actual: "); print($review->get_rev());
        }

            /** @test */
    public function it_sets_name(){
        $review = new Review("hold@hold.com", "hold", "test");
        $expectedName = "test";
        $review-> set_name("test");
        $this->assertEquals("$expectedName", $review->get_name());

        print("\n");
        print("expected: "); print($expectedName);
        print("\n");
        print("actual: "); print($review->get_name());
    }

    /** @test */
    public function it_gets_name(){
        $review = new Review("hold@hold.com", "hold", "getName");
        $this->assertEquals("getName", $review->get_name());

        print("\n");
        print("expected: getName"); 
        print("\n");
        print("actual: "); print($review->get_name());
    }
}