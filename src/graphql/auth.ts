import { DocumentNode, gql } from "@apollo/client";

export interface AuthInput {
    email?: string;
    password: string;
    telNumber?:  string;
}

export const LOGIN: DocumentNode = gql`
	query Login($authInput: AuthInput!) {
		login(authInput: $authInput) {
			token
			generatedAt
			expiresIn
		}
	}
`;



