import { createAppContainer} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import Detailvelib from "./Detailvelib";
import List from "./List";

const  NavList = createStackNavigator({
    Detailvelib: {screen: Detailvelib},
    List: {screen: List},
},
    {
        initialRouteName: 'List',
    });

export const Root = createAppContainer(NavList);
