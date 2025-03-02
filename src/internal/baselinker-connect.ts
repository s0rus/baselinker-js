import type { CurrencyCode, Flag } from "../external/index.js";

export type BaselinkerConnectCategory = {
  /**
   * The method allows you to retrieve a list of all BaseLinker Connect integrations on this account
   */
  getConnectIntegrations: {
    params: void;
    response: {
      /**
       * Array of integrations divided into:
       *  - `own_integrations`: integration created on this account
       *  - `connected_integrations`: integrations to which this account has connected
       */
      integrations: {
        /**
         * Integrations created on this account
         */
        own_integrations: Array<{
          /**
           * Integration ID
           */
          connect_integration_id: number;
          /**
           * Integration name
           */
          name: string;
          /**
           * Integration options
           */
          settings: Array<unknown>;
        }>;
        /**
         * Integrations to which this account has connected
         */
        connected_integrations: Array<{
          /**
           * Integration ID
           */
          connect_integration_id: number;
          /**
           * Integration name
           */
          name: string;
          /**
           * Integration options
           */
          settings: Array<unknown>;
        }>;
      };
    };
  };

  /**
   * The method allows you to retrieve a list of contractors connected to the selected BaseLinker Connect integration
   */
  getConnectIntegrationContractors: {
    params: {
      /**
       * Connect integration ID
       */
      connect_integration_id: number;
    };
    response: {
      /**
       * Array of BaseLinker Connect contractors for selected BaseLinker Connect integration
       */
      contractors: Record<
        string,
        {
          /**
           * Contractor ID
           */
          connect_contractor_id: number;
          /**
           * Contractor name
           */
          name: string;
          /**
           * Contractor credit summary data
           */
          credit_data?: Array<unknown>;
          /**
           * Contractor options
           */
          settings: Array<unknown>;
        }
      >;
    };
  };

  /**
   * The method allows you to retrieve an information about chose contractor trade credit history
   */
  getConnectContractorCreditHistory: {
    params: {
      /**
       * Contractor ID
       */
      connect_contractor_id: number;
    };
    response: {
      /**
       * Array of BaseLinker Connect contractor trade credit data
       */
      credit_data: Array<{
        /**
         * Entry ID
         */
        credit_entry_id: number;
        /**
         * Entry add date
         * Unix timestamp
         */
        date_add: number;
        /**
         * Entry description
         */
        description: string;
        /**
         * Entry three-letter currency symbol (e.g. EUR, PLN, USD)
         */
        currency: CurrencyCode;
        /**
         * Entry type
         * Possible values:
         *  - "charge"
         *  - "payment"
         */
        type: "charge" | "payment";
        /**
         * Entry amount
         */
        amount: number;
        /**
         * Entry status
         * Possible values:
         *  - 0 - waiting
         *  - 1 - active
         */
        is_accepted: Flag;
      }>;
    };
  };

  /**
   * The method allows you to add trade credit for chosen contractor
   */
  addConnectContractorCredit: {
    params: {
      /**
       * Contractor ID
       */
      connect_contractor_id: number;
      /**
       * Trade credit amount
       */
      amount: number;
      /**
       * Trade credit note
       */
      message: string;
    };
    response: object;
  };
};
