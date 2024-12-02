import axios from "axios";

const APIURL = "http://46.101.206.70:8050/subgraphs/name/gateway";

export async function GetEventDecryptionsAfterBlock(blockNumber) {
  const query = `
    query GetEventDecryptionsAfterBlock($first: Int!, $skip: Int!, $blockNumber: BigInt!) {
      eventDecryptions(
        where: { blockNumber_gt: $blockNumber }
        orderBy: blockNumber
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
    blockNumber: blockNumber,
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
      const blockNumber = ""; 
      const result = await GetEventDecryptionsAfterBlock(blockNumber);

      console.log(result.data.eventDecryptions);
    } catch (error) {
      console.error(error);
      process.exitCode = 1;
    }
  })();
}
