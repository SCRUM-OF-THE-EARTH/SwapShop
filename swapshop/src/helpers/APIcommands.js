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
        command: "delete-account",
        file: "deleteAccount.php",
        param_names: ["id"],
    },
    {
        command: "fetch-trade-items",
        file: "fetchtradeItems.php",
        param_names: []
    },
    {
        command: "fetch-sold-trade-items",
        file: "fetchSoldItems.php",
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
    {
        command: "delete-trade-item",
        file: "deleteTradeItem.php",
        param_names: ["id"]
    },
    {
       command:  "fetch-tags",
       file: "fetchtags.php",
       param_names: [],
    },
    {
        command: "fetch-trade-images",
        file: "getImages.php",
        param_names: ['id'],
    },
    {
        command: "add-Tag",
        file: "addTag.php",
        param_names: ['name']
    },
    {
        command: "add-item-tag",
        file: "addItemtag.php",
        param_names: ['item','tag', 'exchange']
    },
    {
        command: "delete-item-tag",
        file: "deleteItemTag.php",
        param_names: ['item', 'tag']
    },
    {
        command: "add-interest",
        file: "addInterest.php",
        param_names: ["user", "tag"]
    },
    {
        command: "remove-interest",
        file: "deleteInterest.php",
        param_names: ["user", "tag"]

    },
    {
        command: "fetch-profile-photo",
        file: "fetchNewPhoto.php",
        param_names: ["id"]
    },
    {
        command: "update-sold-status",
        file: "updateSoldStatus.php",
        param_names: ["item_id", "status"]
    },
    {
        command: "update-trade-item",
        file: "updateTradeItem.php",
        param_names: [
            "item_id", "name", "desc", "value"   
        ]
    }
];
export default APIcommands;