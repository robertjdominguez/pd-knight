import { GraphQLClient, request } from "graphql-request";

export const HasuraApi = `https://pd-knight.hasura.app/v1/graphql`;

const graphQLClient = new GraphQLClient(HasuraApi, {
  headers: {
    "x-hasura-access-key":
      "KSVToZKvUYLS7f4DE6ZvGeQ2ZK4cIg3kmRJKNxTnqV4SzYh7BDioheZ2cGwVVdiL",
  },
});

export function fetcher(query, variables) {
  return graphQLClient.request(query, variables);
}

export const registrationMutation = `
mutation RegistrationMutation($slug: String!, $attendee: String!) {
    insert_registrations(objects: {reg_id: $slug, attendee: $attendee}) {
      returning {
        teacher {
          name
        }
        pdconnection(where: {slug_contains: $slug}) {
          title
        }
      }
    }
  }
`;

export const myRegistrationQuery = `
query MyRegQuery($_myEmail: String!) {
  registrations(where: {attendee: {_eq: $_myEmail}}) {
    present
    pdconnection {
      id
      title
      date
      leader {
        email
        name
      }
      description
      videoLink
    }
  }
}
`;

export const getPdSession = `
query PDSessionQuery($id: ID!) {
  pdSession(where: {id: $id}) {
    title
    description
    date
    hours
  }
}
`;
