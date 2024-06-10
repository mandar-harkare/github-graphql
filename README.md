# POC for Github Graphql API
This repository demonstrate a nodejs code which uses the basic Github Graphql API to fetch the Github data

## Prerequisite
* NodeJs & npm
* Github Access token (Visit [here](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql) for details.)
* Add the environment variables
	* GRAPHQL_ENDPOINT (most likely will be https://api.github.com/graphql)
	* GITHUB_API_TOKEN (the one which you have generated on previous step)


## Steps to run (CLI)
```
git clone git@github.com:mandar-harkare/github-graphql.git
cd github-graphql
npm install
npm run start
``` 
