export const replacementReason = [
    {
        id: 1,
        reasonId: '1',
        title: 'Tag Damaged'
    },
    {
        id: 2,
        reasonId: '2',
        title: 'Lost Tag'
    },
    {
        id: 3,
        reasonId: '3',
        title: 'Tag Not Working'
    },
    {
        id: 4,
        reasonId: '99',
        title: 'Others'
    }
]

// Dummy data for dynamic variables
export const dummyParams = {
    response: {
        custDetails: {
            name: "John Doe",
            mobileNo: "9876543210",
            walletId: "123456789"
        },
        vrnDetails: {
            vehicleNo: "MH12AB1234",
            chassisNo: "CH123456789",
            engineNo: "EN987654321",
            commercial: "Yes",
            vehicleType: "Truck",
            stateOfRegistration: "MH",
            vehicleDescriptor: "Diesel",
            repTagCost: 500,
            isNationalPermit: "1",
            permitExpiryDate: "15-12-2025"
        },
        requestId: "REQ12345"
    },
    customerId: "CUST001",
    userData: {
        id: "user_123",
        name: "Agent Smith"
    },
    sessionId: "SESSION789"
};
