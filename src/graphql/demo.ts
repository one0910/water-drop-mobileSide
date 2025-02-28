import { gql } from "@apollo/client";

export const QUERY = gql`
query QueryUserData($id:String!){
  User:find(id:$id){
    id
    name
    desc
  }
}`

export const UPDATE = gql`
mutation UpdateUserData($id: String!,$params: UserInput!){
  Status:update(id:$id,params:$params)
}`