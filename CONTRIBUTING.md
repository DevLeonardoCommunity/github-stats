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


## Setup GitHub OAuth App (Optional)

1. Go to `GitHub Developer Settings` -> `OAuth Apps` -> `New OAuth App`
![image](https://github.com/priyankarpal/ProjectsHut/assets/88102392/26c397a7-4c11-43a7-8dcd-28b4c901750d)

2. You have to create a new `OAuth App` and fill in the values as shown in the image below.
![image](https://github.com/priyankarpal/ProjectsHut/assets/88102392/26c397a7-4c11-43a7-8dcd-28b4c901750d)
3. Now you have to copy `CLIENT ID` & `CLIENT SECRETS` and paste in `.env.local` file.
![Group 1](https://github.com/priyankarpal/ProjectsHut/assets/88102392/c4f8c346-7aa7-4cb5-9f93-aa8200a3808f)


**Note:**  `Client ID` goes to `GITHUB_ID` and `Client SECRETS` goes into `GITHUB_SECRET`.