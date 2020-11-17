# Automate.io Assignment

Hi. This is my submission for the automate.io assignment for the Sr. Backend Position.
Postman collection [here](https://www.getpostman.com/collections/23979759fc8039cfd1a2).
## Pre-requisites
* Must have Docker and Docker Compose installed and Docker daemon running
* Must have Postman installed.

## Steps to run
The app is dockerised with 2 containers:
* Application Container ( a.k.a Server )
* MongoDB Container

To run the app, perform the following steps:
* Unzip the code archive
* Open the terminal and change present working directory to the folder **automate-assignment** extracted from the archive.
* The Application uses JWT for authentication tokens. In order to sign and verify those, a pair of public / private keys is required when the application is being setup for the first time. Simply run the following command in the **automate-assignment** folder and it will generate the keys for you. For the sake of simplicity, when asked for a passphrase, leave it empty and press enter.
   ```bash
   ./scripts/setup-keys.sh
   ```
   Note: If you receive a permission denied error in the above command, run the following command to acquire appropriate permissions:
   ```bash
   chmod u+x scripts/setup-keys.sh
   ```
* Run the following command:
    ```bash
    docker-compose up --build
    ```
* Import the Postman Collection using the link mentioned above ( Import > Link )
* Import the Postman Environment using the **Postman Environment.json** file so that the environment variables are all set for you to go!
* Once the containers are up, use the **POST /auth/signup** (Postman reference: Sign Up API) to create your user credentials and receive a JWT token.
* Set the JWT token as the **token** variable in Postman environment

You're good to go! 🚀
## Author
Nikhil Gurnani
gurnanikhil@gmail.com