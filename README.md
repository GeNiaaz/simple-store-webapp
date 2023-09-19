# Uncle's online Store

### Steps to run the application

1. Clone the repository on your machine `git clone git@github.com:GeNiaaz/simple-store-webapp.git`
2. Make sure Docker is installed
3. Open a terminal and cd into the cloned repo, then run `docker compose up -d`
4. Open another terminal and cd into `/client` and run `npm start`
5. Open another terminal and cd into `/server` and run `npm start`
6. Access the application at `http://localhost:3000`

### Using the application

The application has only 2 distinctions for users: One is any user (not signed in) and another is an admin (signed in).

A user can view all the products available which are displayed in a grid in 3 columns.
When signed in, the admin has access to the view whereby the admin can edit, delete or add new products.

Signing in to an admin role simply requires clicking on login on the top right and entering the credentials. After which the user will be automatically redirected to the home page to edit the products. So long as the admin does not click sign out, the token will remain in the browser and thus the user can login on new tabs or even after closing and reopening the browser.

User can also choose to return home from the sign in page by clicking the link below the Login button.

** Important Point **
Because my tables are created by the NodeJS backend after it connects to the MySQL database, I am unable to pre-populate the MySQL database with Docker Compose. As a result, I created a sign up page in the frontend for the express purpose of demonstration. Access to this page is by adding /signup to the URL. Note: This is NOT meant to be a part of the final app, it is simply to facilitate testing, and allow testing to be done by adding an admin.

Sample admin credentials to add on the `/signup` page with:

| NO  | USERNAME | PASSWORD     |
| --- | -------- | ------------ |
| 1   | Laval    | password     |
| 2   | Niaaz    | 4jv94j490v44 |
| 3   | Ishak    | Hello123     |

### How to deploy app on a cloud environment

Firstly we would have to choose a cloud environment. For simplicity's sake, I will go with AWS.
Assuming AWS is chosen and accounts are created, we can proceed.

The application is containerized into a React frontend, NodeJS backend and MySQL database. Each has its own container. We would now need to upload these images into AWS's container registry, ECR. This can be done through the CLI using the IAM's credentials. (ensure images tagged correctly)

Next we would need to setup an orchestration service. This ensures that the microservices remain resilient even if one of the services are down. For this purpose we would use EKS (Elastic kubernetes service). With the Kubernetes YAML file, we would define our deployments, services and other required resources. We can also allow for scaling and load balancing in case of unexpected high demand to keep the service running even when many requests are coming in. This allows for requests to the service to be load balanced across redundant services, ensuring smooth operation even when demand is high or when services go down.

Assuming a custom domain exists, configure DNS settings to point to the public IP / domain name provided by AWS. This allows for users to access the website.

Additionally we can implement CI/CD pipelines. This would allow for new code pushed to the repository to be containerized, and for these new containers (should they pass the necessary checks) to be pushed into production.

### Security hardening techniques in a cloud environment

#### Identity and access management (IAM)

With regards to user management, it would be best to apply the Principle of Least Privilege to ensure that each AWS user, group or role has only the permissions required to perform their respective tasks, and nothing more.

#### Virtual Private Cloud

Launch AWS resources in a logically isolated virtual network that we define. This creates a virtual boundary around all our resources, with the only access to the internet through an internet gateway.

This virtual boundary helps to limit the resources' access to the internet, minimizing the chances of an attack.

#### Cloudflare

We can make use of Cloudflare to enable CDN capabilities but more importantly for DDOS protection. Cloudflare also enables SSL which allows for data to remain secure as well as preventing a Man in the Middle attacks. DDOS protection would allow the service to remain up in the face of a targeted DDOS attack on our service.

#### Application Security

We can make use of Amazon CodeGuru which would allow for scanning of our codebase for known vulnerabilities which can be patched as they are discovered. Additionally, we can make use of AWS Web Application Framework (WAF) to protect our service from malicious requests.

### Assumptions

Since the service is meant for people to browse an online store, I made the assumption that normal users do not need to login to view all the products, but are disallowed from editing the products displayed. I also do not have a signup page as only admin users would require access, hence a public facing signup page would be redundant.

I chose for each product to have a Name, Price, Description, Quantity and Category.

### Justifications

#### Abstraction of Backend API

To avoid crowding my app.js file with too much logic, I abtracted away the routes into the 2 routes files. Additionally, the API functions themselves live in /controllers. This allows me to keep the relevant API's grouped together, making them more readable and extensible.

#### Logging

When logging, I grouped the authentication logs into `error`, `warn` and `info`. For products, simply `error` and `info`. This way when something goes wrong, the smaller `error` / `warn` files can be more easily sifted through to allow for quicker debugging.

Additionally, the most severe logs such as error would be present in all other files, but the `error` logs file only has `error`. This allows us to view all logs at once by opening `info`.

I chose to save logs in the backend instead of a database as it makes it easier for developers to open and view, especially for a small application like mine.

I saved the database credentials in the .env file as this app is simply hosted locally. But in a hosted environment, I would use SECRETS which would reside in the cloud itself and not the application, and would require minimal modification as the credentials are not hardcoded in the app.

#### Input Validation

Input validation is done at 2 levels in my app. One is at the frontend, and one is at the backend. The frontend input validation is caught early and helps to prevent unnecessary calls to the database should the data be incorrect.

Backend input validation is enforced by the ORM Sequelize. I have defined several rules in `models/` that ensure that incorrect data is not saved into the database itself, as a final protection. This ensures that things like duplicate names, emails etc are stopped at the ORM level.

#### Security

I took several steps to ensure that requests to the database are rendered safe before they reach the database, through the following Middlewares.

Helmet: By using Helmet, the application is able to secure HTTP headers. This prevents attackers from knowing your specific vulnerabilities, adding an extra layer of protection. Another example is that X-Frame-Options are set to SAMEORIGIN. This prevents clickjacking attacks.

XSS: This helps to sanitize the request and prevent Cross Site Scripting attacks.

Sanitize: Sanitize was used to prevent SQL injection attacks.

#### JWT Tokens

I chose to go with JWT because they do not require another database entry to verify. They can be verified on the fly with the secret key. The user has not signed in has no way to click to get to the editing admin page, however I took the liberty of also protecting the endpoint itself. If the user has no verifiable token, then trying to access the editing admin page endpoint will redirect the user back to the Public main page.
