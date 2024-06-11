const express = require('express');
const app = express()
const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client');
const fetch = require('node-fetch');

//Fill in the GraphQL endpoint and your Github Secret Access Token inside secrets.

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env['GRAPHQL_ENDPOINT'], fetch, headers: {
      'Authorization': `Bearer ${process.env['GITHUB_API_TOKEN']}`,
    },
  }),
  cache
});

const customQ1 = gql`{
	search(query: "topic:alexa-skill-template sort:updated-desc", type: REPOSITORY, first: 5) {
		repositoryCount
		nodes {
			... on Repository {
			nameWithOwner
			description
			updatedAt
			createdAt
			diskUsage
			}
		}
	}
}`
const customQ2 = gql`{
	viewer {
		login
	}
}`

const getRepositoriesQuery = gql`{
	viewer {
		name
		repositories(last: 30) {
			nodes {
			  name
        url
			}
		}
	}
}`

// const getIssuesQuery = gql`query getIssues($owner_name: String!, $repository_name: String!){
// 	repository(owner:$owner_name, name:$repository_name) {
// 	  issues(last:20) {
// 		edges {
// 		  node {
// 			title
// 			url
// 			labels(first:5) {
// 			  edges {
// 				node {
// 				  name
// 				}
// 			  }
// 			}
// 		  }
// 		}
// 	  }
// 	}
// }`

const getIssuesQuery = gql`{
	repository(owner:"mandar-harkare", name:"nodejs") {
	  issues(last:20) {
		edges {
		  node {
			title
			url
			labels(first:5) {
			  edges {
				node {
				  name
				}
			  }
			}
		  }
		}
	  }
	}
}`

const customQ5 = gql`{
	repository(owner:"mandar-harkare", name:"Hello-World") {
		issues(last:20, states:CLOSED) {
      edges {
        node {
          title
        }
      }
    }
	}
}`

const customQ6 = gql`{
  organization(login: "github") {
    repositories(last: 10) {
      edges {
        cursor
        node {
          name
          id
        }
      }
    }
  }
}`

// const getResults = async () => {
// 	const results = await client.query({
// 		query: customQ3
// 	})
// 	console.log(results.data.viewer.repositories.nodes)
// }
// getResults();

app.get('/repositories', async function(req, res) {
  const results = await client.query({
		query: getRepositoriesQuery
	})
	console.log(results.data.viewer.repositories.nodes)

	// const result = '''
  //     {results.data.viewer.repositories.nodes.map((repo) => (
  //       <option key={repo.name} value={repo.url}>
  //         {repo.name}
  //       </option>
  //     ))}'''
  res.send(results.data.viewer.repositories.nodes)
});

app.get('/issues', async function(req, res) {
	const issuesVar = {
		owner_name: "mandar-harkare",
		repository_name: "nodejs"

	}
  const results = await client.query({
		query: getIssuesQuery,
		// varaibles: issuesVar
	})
	console.log(results.data.repository.issues.edges)
  res.send(results.data.repository.issues.edges)
});

app.listen(8000, () => console.log(`Example app listening on port 8000!`))
