import React from 'react';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { TabContainer, Tab } from './styles';

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <TabContainer style={{ elevation: 5 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const Icon = options.tabBarIcon;

        const isActive = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Tab
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            active={isActive}
            key={route.name}
            index={index}
          >
            <Icon color="#fff" size={25} />
          </Tab>
        );
      })}
    </TabContainer>
  );
};

export default CustomTabBar;
