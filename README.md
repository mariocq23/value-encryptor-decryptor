# Value Encryptor/Decryptor

This is a NodeJs/Express Value Encryptor/Decryptor PoC

## Installation

Download the Git Repository

```bash
git clone https://github.com/mariocq23/value-encryptor-decryptor.git
```
Build the Docker file

```bash
docker build -t mariocq/value-encryptor-decryptor .   
```

## Execution

You can either follow the previous steps for installation or run the uploaded dockerhub image directly
 
```bash
docker run -p 49160:8080 -it mariocq/value-encryptor-decryptor 
```

## Usage
If you wish to encrypt or decrypt a string with special characters make sure of substituting them with their ANSI code equivalent. For example -> For "space" => %20

```bash
curl -i localhost:49160/api/encrypt/my%20text

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json
Date: Mon, 12 Apr 2021 23:37:29 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 128

{
   "Input": "my text",
   "Output": "U2FsdGVkX195NbeUuZMderwvmbE5lgmcSF/fi1Na5CY=",
   "Status": "success",
   "Message": ""
}                                                                                                                        
```