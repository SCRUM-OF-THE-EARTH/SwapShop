import { Communicator } from "../classes/Communicator";
import { Trade_item_list, Item_List, Tag_list } from "../classes/Item_List";
import { Login_user } from "../classes/User_Account";

// exporting a static instance of the communicator
export const communicator = new Communicator("https://sudocode.co.za/SwapShop/backend/");

// exporting the default instance of login user to be used by the app;
export const login_user = new Login_user(communicator);

// exporting the default instance of the trade items list and sold trade items list
export const trade_items_list = new Trade_item_list(false, communicator, login_user);
export const sold_trade_items_list = new Trade_item_list(true, communicator, login_user);

// exporting default instance of the user accounts list to be used in the app
export const user_accounts_item_list = new Item_List('fetch-user-accounts', communicator);

// exporting the default instance of the tags list
export const tags_list = new Tag_list(communicator);