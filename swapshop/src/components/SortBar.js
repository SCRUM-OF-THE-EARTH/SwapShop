import React, {useState, useContext } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import themeContext from '../components/themeContext';

// the sort bar is a specific drop down ,enu used to get a sorting index for the item list
const SortBar = ({setIndex}) => {
    // declare and initialise state variables for the sorting drop down menu
    const [sortMenuOpen, setSortMenuOpen] = useState(false); // set the drop down menu for sorting to closed 
    const [sortValue, setSortValue] = useState(null);
    const [sortItems, setSortItems] = useState([ // set the items in the sorting drop down menu
        {label: "Latest post", value: 0},
        {label: "Price: High to Low", value: 1},
        {label: "Price: Low to High", value: 2},
        {label: "Name: A to Z", value: 3},
        {label: "Name: Z to A", value: 4},
    ]); 
    const theme = useContext(themeContext);
    return(
        <View>
        <DropDownPicker
                    open={sortMenuOpen}
                    value={sortValue}
                    items={sortItems}
                    setOpen={setSortMenuOpen}
                    setValue={setSortValue}
                    setItems={setSortItems}
                    placeholder="Sort"
                    style={{ backgroundColor: theme.inputColor, borderColor: theme.inputColor}}
                    dropDownContainerStyle={{backgroundColor: theme.inputColor, borderColor: theme.inputColor}}
                    placeholderStyle={{color:theme.placeholder}}
                    onChangeValue={(value) => setIndex(value)}
                    zIndex={500}
                />
        </View>
    )
}
export default SortBar;