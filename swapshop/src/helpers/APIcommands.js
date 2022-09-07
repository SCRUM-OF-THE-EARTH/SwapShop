// This is a list of commands adn associated php API files
// it is used by the communicator to find and construct an API cal using a command

const APIcommands = [
    {
        command: "register_account",
        file: "registerAccount.php",
        param_names: [
            "fname", "lname", "user", "pass", "email"
        ],
    },

    {
        command: "login_account",
        file: "login.php",
        param_names: [
            "user", "pass"
        ], 
    },
    {
        command: "fetch-trade-items",
        file: "fetchtradeItems.php",
        param_names: []
    },
    {
        command: "fetch-user-accounts",
        file: "fetchUserAccounts.php",
        param_names: []
    },
    {
        command: "add-trade-item",
        file: "addTradeItem.php",
        param_names: [
            "name", "desc", "value","id"
        ]
    },
];
export default APIcommands;