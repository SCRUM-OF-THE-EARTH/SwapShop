export default APIcommands = [
    {
        command: "register_account",
        file: "registerAccount.php",
        param_names: [
            "fname", "lname", "user", "pass", "email"
        ],
        // return_type: "boolean",
    },

    {
        command: "login_account",
        file: "login.php",
        param_names: [
            "user", "pass"
        ],
        // return_type: 
    },
];