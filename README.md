# Deployment 

- Signup on Aws 
- Launch Instance
-chmod 400 <secret>.pem
-ssh -i "" -----Git clone 
- Frontend 
        - npm install -> dependencies install
        - npm run build -1
        - sudo apt update
        - sudo apt install nginx
        - sudo systemctl stat nginx
        - sudo systemctl enable nginx
        - Copy code from dist to /var/www/html/
        - sudo scp -r dist/* /var/www/html/ 
        - Enable port 80

-Backend 
        -allowed ec2 instance public ip on mongo db server
        - npm install pm2 -g
        - pm2 start npm --name "devtinder-backend" --start
        - pm2 logs
        -pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>
        - config nginx - /etc/nginx/sites-available/default
        - restart nginx - sudo systemctl restart nginx
        - Modify the BASEURL in in frontend project to /api


Adding a Custom domain name 
                          - DNS mapping
                          - signup on cloudflare & add a new domain name
                          - change the nameservers on godaddy and point it to cloudflare
                          -wait for sometime till your nameservers are updated
                          - DNS record : A devtinder.in ip address
                          - Enable SSl for website
                        

Sending Emails via SES
                - Create a IAM user 
                - Give Access to AmazonSESFull Access
                - Amazon SES: Create a Identity
                - Verify your domain name 
                - Verify an email address
                - Install AWS SDk - v3
                - code Example https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/ses/src/ses_sendemail.js#L16
                -Setup SesClient
                -Access Credentials should be created in IAM under SecurityCredentials Tab
                -Add the credentials to the new env file
                -Write code for SesClient
                -Write code for Sending email address
                - Make the email dynamic by passing more params to the run function 

improve Ui auth in web sockets
fix bug if i am not friend i should not be able to send messgae

asasasasassaasas