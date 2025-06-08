# Run
`npx quartz create`

# Deployment
1. Spin up a VPS
2. Install docker
3. Install a github runner on it
4. Run the runner as a service
5. Git clone the repository to the same machine - use a deployment SSH key
6. Setup NGINX reverse proxy on the server with certbot

Each deploy should have its own user (because of deployment SSH keys, otherwise a magic with ~/.ssh/config file has to be made to make GIT use different keys for different github repos)

# Acknowledgment
Thank you very much, [Jacky Zhao](https://github.com/jackyzha0/quartz)