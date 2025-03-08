import type {
  CreatePackageManualResponse,
  CreatePackageResponse,
  GetCourierAccountsResponse,
  GetCourierFieldsResponse,
  GetCourierPackagesStatusHistoryResponse,
  GetCourierServicesResponse,
  GetCouriersListResponse,
  GetLabelResponse,
  GetOrderPackagesResponse,
  GetProtocolResponse,
  GetRequestParcelPickupFieldsResponse,
  RequestParcelPickupResponse,
} from "../../src";

export const createPackage: CreatePackageResponse = {
  package_id: 1,
  package_number: "1",
  courier_inner_number: "1",
};

export const createPackageManual: CreatePackageManualResponse = {
  package_id: 1,
  package_number: "1",
};

export const getCouriersList: GetCouriersListResponse = {
  couriers: [
    {
      code: "test",
      name: "Test",
    },
  ],
};

export const getCourierFields: GetCourierFieldsResponse = {
  fields: [
    {
      name: "test",
      type: "text",
      id: "test",
      desc: "test",
      value: "test",
    },
  ],
  multi_packages: 0,
  package_fields: [
    {
      type: "text",
      id: "test",
      name: "test",
    },
  ],
};

export const getCourierServices: GetCourierServicesResponse = {
  services: {
    "1": "test",
    "2": "test2",
  },
};

export const getCourierAccounts: GetCourierAccountsResponse = {
  accounts: [
    {
      name: "test",
      id: 1,
    },
  ],
};

export const getLabel: GetLabelResponse = {
  label: "test",
  extension: "pdf",
};

export const getProtocol: GetProtocolResponse = {
  protocol: "test",
  extension: "pdf",
};

export const getOrderPackages: GetOrderPackagesResponse = {
  packages: [
    {
      package_id: 1,
      courier_inner_number: "1",
      is_return: true,
      courier_code: "test",
      package_type: 0,
      tracking_url: "test",
      tracking_status: 0,
      courier_package_nr: "1",
      courier_other_name: "test",
      tracking_status_date: 1679574400,
      tracking_delivery_days: 0,
    },
  ],
};

export const getCourierPackagesStatusHistory: GetCourierPackagesStatusHistoryResponse =
  {
    packages_history: {
      "1": [
        {
          tracking_status_date: 1679574400,
          tracking_status: 0,
          courier_status_code: "test",
        },
      ],
    },
  };

export const deleteCourierPackage = {};

export const requestParcelPickup: RequestParcelPickupResponse = {
  pickup_number: "1",
};

export const getRequestParcelPickupFields: GetRequestParcelPickupFieldsResponse =
  {
    fields: [
      {
        id: "test",
        name: "test",
        type: "text",
        value: "test",
        desc: "test",
      },
    ],
  };
