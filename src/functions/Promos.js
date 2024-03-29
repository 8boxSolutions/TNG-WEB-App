import axios from "axios";

async function getPromos(businessID) {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_REST_API}ViewAllPromoByBusinessUnit`,
      {
        BusinessUnitID: businessID,
      }
    );

    if (data?.valid) {
     return data
    } else {
      return data;
    }
  } catch (e) {
    return {
      valid: false,
    };
  }
}

export { getPromos };
