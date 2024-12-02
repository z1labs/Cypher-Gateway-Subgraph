import axios from "axios";

const APIURL = "http://46.101.206.70:8050/subgraphs/name/gateway";

export async function GetEventDecryptions() {
  const query = `
    query GetEventDecryptions($first: Int!, $skip: Int!) {
      eventDecryptions(
        where: { resultCallback: null }
        orderBy: blockTimestamp
        orderDirection: asc
        first: $first
        skip: $skip
      ) {
        id
        blockNumber
        blockTimestamp
        cts
        contractCaller
        callbackSelector
        msgValue
        maxTimestamp
        passSignaturesToCaller
      }
    }
  `;

  const variables = {
    first: 50,
    skip: 0,
  };

  const data = {
    query: query,
    variables: variables,
  };

  try {
    const response = await axios.post(APIURL, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

if (require.main === require) {
  (async () => {
    try {
      const result = await GetEventDecryptions();

      console.log(result.data.eventDecryptions);
    } catch (error) {
      console.error(error);
      process.exitCode = 1;
    }
  })();
}
