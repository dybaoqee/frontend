import { GET_DISTRICTS } from 'graphql/listings/queries'

const districts = [
  {
    request: {
      query: GET_DISTRICTS,
      variables: {},
    },
    result: {
      data: {
        districts: [
          {"citySlug":"rio-de-janeiro","stateSlug":"rj","nameSlug":"humaita","city":"Rio de Janeiro","state":"RJ","name":"Humaitá"},
          {"citySlug":"rio-de-janeiro","stateSlug":"rj","nameSlug":"copacabana","city":"Rio de Janeiro","state":"RJ","name":"Copacabana"},
          {"citySlug":"rio-de-janeiro","stateSlug":"rj","nameSlug":"botafogo","city":"Rio de Janeiro","state":"RJ","name":"Botafogo"},
          {"citySlug":"rio-de-janeiro","stateSlug":"rj","nameSlug":"catete","city":"Rio de Janeiro","state":"RJ","name":"Catete"},
          {"citySlug":"rio-de-janeiro","stateSlug":"rj","nameSlug":"cosme-velho","city":"Rio de Janeiro","state":"RJ","name":"Cosme Velho"},
          {"citySlug":"rio-de-janeiro","stateSlug":"rj","nameSlug":"flamengo","city":"Rio de Janeiro","state":"RJ","name":"Flamengo"}
        ],
      },
    },
  },
]

export {
  districts
}
