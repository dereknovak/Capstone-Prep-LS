# VPS

- Virtual Private Server
    - Computer that's being hosted for us
    - Hosting using DigitalOcean
- Building steps
    - Firewall
        - Bouncer for Network traffic
            - Let certain things in, others out
        - SSH
            - Secure way to connect to another machine's terminal
    - nginx
        - After Firewall, this will direct traffic to appropriate app
        - Set up SSL certificate
    - PM2
        - Process Manager

- pdf with some instructions
    - chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://ls-general-public.s3.amazonaws.com/tech_talks/01%20-%20Creating%20a%20Droplet%20on%20Digital%20Ocean.pdf
- Setting up nginx on Ubuntu
    - https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04

1. A VPS we can connect to via its IP address
    - SSH Key
        - Something on your computer 
        - A way for other machines to ID your computer as your own and give you proper access rights
        - Creating a Key
            - Be careful that you do not have any other SSH keys already, as these will get wiped.
            - Enter a passphrase (my standard one)
            - This creates a public key and a private key
                - Public key is used for VPS
                - Private key is used only to verify connection
            - Give server public key
                - `cat ~/.ssh/id_rsa.pub` or `cat ~/.ssh/id_ed25519.pub`
                - If permissions need to be changed:
```
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```
                - If this doesn't work, use AI to solve remaining permission problems
        - Assigns machine an IP address
            - 143.244.155.202
2. ...securely
    - Access server via IP address
        - `ssh root@[IP Address]`
    - Use Firewall
    - Create an unprivileged account (used to connect to machine)
        - `adduser [name]`
    - Provide escalated privileges to user (add to sudo user)
        - `usermod -aG [Group] [User]`
    - Move public ssh key to unprivileged account
        - `rsync --archive --chown=[User]:[Group] ~/.ssh /home/[User]`
        - `rsync --archive --chown=derek:derek ~/.ssh /home/derek`
    - Disconnect connection (`ctl D`)

    - Firewall (ufw)
        1. Enable SSH traffic
            - `sudo ufw allow OpenSSH`
        2. Enable Firewall
            - `sudo ufw enable`
        - If you enable firewall first, it will close all connections and lock us out of server
    - Disable root account for added security
        - `sudo vim /etc/ssh/sshd_config`
        - Search using `/`
        - Insert new text with `i`
        - Esc INSERT editor with `esc`
        - `:wq` to save changes
    - Install node on VPS
        - `sudo apt install nodejs`
    - Install NPM
        - `sudo apt install npm`
3. ... able to run our Express App
    - Add repository to home
    - Allow appropriate port
        - `sudo ufw allow [Port]`

    - To route traffic from domain to IP address, use `A` record
        - For Bluehost:
            - Hosting => cPanel => Zone Editor
        - For NameCheap
            - Domain List => Manage => Advanced DNS
    - Set up for `@` and `www`
4. ... using nginx as a web server to route requests to our Express app
    - Setup nginx
        - Webserver (listening for requestes from the internet)
        - Reverse Proxy (responsible for routing requests to appropriate place)
    - Update software repository
        - `sudo apt update`
    - Install nginx
        - `sudo apt install nginx`
        - nginx is the perfect default
    - Enable traffic
        - `sudo ufw app list`
            - Different applications that work with Firewall
        - Allow http traffic
            - `sudo ufw allow 'Nginx HTTP'`
    - Confirm nginx is running
        - `systemctl status nginx`

    - Configure nginx
        - Telling it what to do when it receives a request from the domain
        - We want it to direct request over to our app
    - Editing default config files
        - `sudo vim /etc/nginx/sites-available/default`
        - Change `server name _;` to includes domain hosts
        - Run `sudo nginx -t` to ensure there are no typos
        - Reload nginx `sudo sytemctl reload nginx`
    - Insert Location config text
```
location / {
      proxy_pass http://localhost:3000;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
}
```
    - Anytime anyone tries to access root (`/`), follow instructions
5. ...which is being run as a service by pm2
    - pm2 (Process Manager)
        - Ensures app is always up and running
        - Saves us from having to open server and manually start app
    - Tell pm2 to run our app
        - `pm2 start [App name]`
        - `pm2 start app.js`
        - If using `npm start`
            - `pm2 start npm -- start`
    - Tell pm2 to start up when system D starts up
        - `pm2 startup systemd`
    - Save changes
        - `pm2 save`
6. 
    - Get an SSL certificate (for FREE)
    - Use LetsEncryt Certbot
        - Add software repository
        - `sudo add-apt-repository ppa:certbot/certbot`
    - Install certbot
        - `sudo apt install certbot python3-certbot-nginx -y`
    - Request Certificate
        - `sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com`
    - Remove `Nginx HTTP` and add `Nginx FULL` for HTTP/HTTPS
        - `sudo ufw delete allow 'Nginx HTTP'`
        - `sudo ufw allow 'Nginx Full'`
    - Verify
        - `sudo systemctl restart nginx`
        - Visit domain
    - This does ALL the configuration for you

## Server Blocks
    - Use this guide
        - https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04


- Server Blocks
    - Can set up different sections to run different apps from the same server
- Can have a static app (derek.com)
- Can add roots within the JS app to add dynamics to app
    - Different blocks
- Learn MongoDB before setting up in server

- sudo apt install postgreSQL (or something similar)

- Try nano (replace where you place vim)
    - 

