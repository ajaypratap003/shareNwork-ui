import { gql } from '@apollo/client';

export const getEmployees = gql`
query getEmployees {  
    sharedResource{
     id,
     firstName
    }      
}`;

export const  getSkills= gql`
query skills {  
    skill{
        id,
        name
    }     
}`;
