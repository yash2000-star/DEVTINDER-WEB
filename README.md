# Deployment 

- Signup on Aws 
- Launch Instance
-chmod 400 <secret>.pem
-ssh -i "" -----Git clone 
- Frontend 
        - npm install -> dependencies install
        - npm run build
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


        