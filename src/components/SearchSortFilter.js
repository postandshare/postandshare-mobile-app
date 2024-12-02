import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Menu, TextInput} from 'react-native-paper';
import Colors from '../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Sizes from '../constants/Sizes';
import {Text} from 'react-native-paper';
const SearchSortFilter = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
}) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={styles.row_container}>
      <TextInput
        mode="outlined"
        label={'Search'}
        style={styles.searchInput}
        placeholder="Search"
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      <Menu
        visible={visible}
        contentStyle={{
          backgroundColor: Colors.Background,
        }}
        onDismiss={() => setVisible(false)}
        anchor={
          <TouchableOpacity
            style={styles.sortButtonContainer}
            onPress={() => setVisible(true)}>
            <FontAwesome name="sort" size={15} color={Colors.white} />
            <Text style={styles.sortText}>
              {sortOption === 'Newest' ? 'Newest' : sortOption}
            </Text>
          </TouchableOpacity>
        }>
        <Menu.Item
          title="A to Z"
          onPress={() => {
            setSortOption('AtoZ');
            setVisible(false);
          }}
          icon={sortOption === 'AtoZ' ? 'check' : 'none'}
        />
        <Menu.Item
          title="Z to A"
          onPress={() => {
            setSortOption('ZtoA');
            setVisible(false);
          }}
          icon={sortOption === 'ZtoA' ? 'check' : 'none'}
        />
        <Menu.Item
          title="Newest"
          onPress={() => {
            setSortOption('Newest');
            setVisible(false);
          }}
          icon={sortOption === 'Newest' ? 'check' : 'none'}
        />
        <Menu.Item
          title="Oldest"
          onPress={() => {
            setSortOption('Oldest');
            setVisible(false);
          }}
          icon={sortOption === 'Oldest' ? 'check' : 'none'}
        />
      </Menu>
    </View>
  );
};

export default SearchSortFilter;

const styles = StyleSheet.create({
  row_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    width: '75%',
    borderRadius: 10,
    height: 40,
    alignSelf: 'center',
    margin: 5,
  },
  sortButtonContainer: {
    backgroundColor: Colors.PRIMARY,
    padding: 7,
    height: Sizes.height * 0.04,
    width: Sizes.width * 0.2,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  sortText: {
    color: Colors.white,
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
