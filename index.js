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

const customQ3 = gql`{
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

const customQ4 = gql`{
	repository(owner:"octocat", name:"Hello-World") {
	  issues(last:20, states:CLOSED) {
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

const getResults = async () => {
	const results = await client.query({
		query: customQ3
	})
	console.log(results.data.viewer.repositories.nodes)
}
getResults();
