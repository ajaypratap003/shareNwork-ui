import { gql } from '@apollo/client';

const getSkills = gql`
query getSkills {  
    skill{
     id,
     name
    }      
}`;

export { getSkills };