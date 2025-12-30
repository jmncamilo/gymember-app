const {
    updateCustomerMembershipInfoPartial,
    updateCustomerDetailsInfoPartial,
    updateCustomerMainInfoPartial
} = require("../../models/customersModel.js");

const customersMethods = {
    Customers: updateCustomerMainInfoPartial,
    Customers_Details: updateCustomerDetailsInfoPartial,
    Customers_Memberships: updateCustomerMembershipInfoPartial
};

module.exports = { customersMethods };