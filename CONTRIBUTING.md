# How to Contribute

1. Fork the repository
2. Clone the repository to your local machine
3. Create a new branch 
```
 git checkout -b <branch-name>
```

4. Make your changes
5. Commit and push your changes
```
 git add .
 git commit -m "commit message"
 git push origin <branch-name>
```
6. Create a pull request
7. Wait for the pull request to be reviewed and merged


# How to Setup Environment Variables

Duplicate and rename the file `.env.example` to `.env.local` and fill in the values.

Just you need to add only `DEV_GITHUB_TOKEN` in `.env.local` file.
## GitHub Token

1. Go to `GitHub Settings` -> `Developer Settings` -> `Personal Access Tokens` -> `Token (classic)` -> `Generate new token`
![image](https://github.com/priyankarpal/ProjectsHut/assets/88102392/bcb319ec-0596-4dfc-ba88-097f591f18e4)
2. Give the `repo` permission, add token name and copy the token and paste in `.env.local` file.

