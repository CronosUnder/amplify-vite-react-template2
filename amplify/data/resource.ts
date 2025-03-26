import {
  a,
  type ClientSchema,
  defineData
} from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
/*
type Playlist @model {
  id: ID!
  name: String!
  description: String!
  owner: String
  createdAt: String
  posts: [PlaylistPost] @connection(name: "PlaylistPost")
}
type Post @model {
  id: ID!
  name: String!
  description: String!
  thumbnail: S3Object!
  video: S3Object!
  owner: String
  createdAt: String
  playlists: [PlaylistPost] @connection(name: "PostPlaylist")
}
type PlaylistPost @model {
  id: ID!
  createdAt: String
  playlist: Playlist @connection(name: "PlaylistPost")
  post: Post @connection(name: "PostPlaylist", sortField: "updatedAt")
}
*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Member: a.model({
    name: a.string().required(),
    // 1. Create a reference field
    teamId: a.id(),
    // 2. Create a belongsTo relationship with the reference field
    team: a.belongsTo('Team', 'teamId'),
  }).authorization((allow) => [allow.publicApiKey()]),
  Team: a.model({
    mantra: a.string().required(),
    // 3. Create a hasMany relationship with the reference field
    //    from the `Member`s model.
    members: a.hasMany('Member', 'teamId'),
  }).authorization((allow) => [allow.publicApiKey()]),
  Post: a.model({
    name: a.string().required(),
    description: a.string().required(),
    owner: a.string(),
    createdAt: a.string(),
    playlists: a.hasMany('PlaylistPost', 'postId'),
  }).authorization((allow) => [allow.publicApiKey()]),
  Playlist: a.model({
    name: a.string().required(),
    description: a.string().required(),
    owner: a.string(),
    createdAt: a.string(),
    posts: a.hasMany('PlaylistPost', 'playlistId'),
  }).authorization((allow) => [allow.publicApiKey()]),
  PlaylistPost: a.model({
    createdAt: a.string(),
    playlistId: a.id(),  // Agregamos el ID de la playlist
    postId: a.id(),  // Agregamos el ID del post
    playlist: a.belongsTo('Playlist', 'playlistId'),
    post: a.belongsTo('Post', 'postId'),
  }).authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
