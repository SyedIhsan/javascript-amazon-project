const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  console.log(xhr.response);
});

xhr.open("GET", "https://supersimplebackend.dev");
xhr.send();

/*
Type of requests:

GET = get some information from the backend
POST
PUT
DELETE

URL = Uniform Resource Locator

Request-Response Cycle = 1 request, 1 response
Send message to Backend = Request
Send message to Frontend = Response

Status Code

Starts with 4 or 5 (400, 404, 500) = failed
Starts with 4 = Our problem
Starts with 5 = Backend's problem
Starts with 2 (200, 201, 204) = succeeded

Backend API
API = application programming interface

Using the browser = making a GET request
*/