import type {
  GetConnectContractorCreditHistoryResponse,
  GetConnectIntegrationContractorsResponse,
  GetConnectIntegrationsResponse,
} from "../../src";

export const getConnectIngegrations: GetConnectIntegrationsResponse = {
  integrations: {
    own_integrations: [
      {
        connect_integration_id: 1,
        name: "Integration 1",
        settings: [],
      },
    ],
    connected_integrations: [],
  },
};

export const getConnectIntegrationContractors: GetConnectIntegrationContractorsResponse =
  {
    contractors: {
      "1": {
        connect_contractor_id: 1,
        name: "Contractor 1",
        settings: [],
      },
      "12": {
        connect_contractor_id: 32,
        name: "Contractor 23",
        settings: [],
      },
    },
  };

export const getConnectContractorCreditHistory: GetConnectContractorCreditHistoryResponse =
  {
    credit_data: [
      {
        credit_entry_id: 1,
        date_add: 1679574400,
        description: "Credit entry 1",
        currency: "PLN",
        type: "charge",
        amount: 100,
        is_accepted: 1,
      },
      {
        credit_entry_id: 2,
        date_add: 1679574400,
        description: "Credit entry 2",
        currency: "PLN",
        type: "payment",
        amount: 200,
        is_accepted: 1,
      },
    ],
  };

export const addConnectContractorCredit = {};
