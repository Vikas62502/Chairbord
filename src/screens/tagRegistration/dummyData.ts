export const dummyProps = {
    route: {
        params: {
            sessionId: '123456789',
            customerId: '987654321',
            CusRegData: {
                data: {
                    custDetails: {
                        name: 'John Doe',
                        email: 'johndoe@example.com',
                        phone: '1234567890',
                    },
                },
            },
            otpData: {
                otp: '123456',
                expiryTime: '2024-12-31T23:59:59Z',
            },
            userData: {
                userId: '1122334455',
                name: 'Agent Smith',
                vehicleNo: 'DL1CAB1234',
            },
            response: {
                vrnDetails: {
                    vehicleNo: 'RJ14CU6635',
                    make: 'Toyota',
                    model: 'Innova',
                    year: '2022',
                },
            },
        },
    },
    // navigation: {
    //   navigate: (screenName, params) => {
    //     console.log(`Navigating to ${screenName} with params:`, params);
    //   },
    //   goBack: () => {
    //     console.log('Going back');
    //   },
    // },
};