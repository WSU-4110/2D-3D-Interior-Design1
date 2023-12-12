- Docker is the best way to run this application, once Docker is installed:
1. Clone the repository
2. In the command line, cd into the repository and run the following commands:
	$ docker build -t room-raiser . 	#include the . !
	$ docker run -p 5500:5500 room-raiser
3. navigate to http://localhost/5500
