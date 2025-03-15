import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { fetchCurrencies } from '@/data/data';

type SelectOption = {key:string, value:string}

const CurrencySelector = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<SelectOption>({key:'USD', value:'USD'});
  const [currencies, setCurrencies] = useState<SelectOption[]>([]);

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const fetchedCurrencies = await fetchCurrencies()
        const data = fetchedCurrencies.map((currency) => ({
          key: currency,
          value: currency,
        } as SelectOption));
        setCurrencies(data);
        if (data.length > 0) {
          setSelectedCurrency(data[0]);
        }
      } catch (error) {
        console.error('Error fetching currencies: ', error);
      }
    };
    loadCurrencies();
  }, []);

  return (
      <View style={styles.container}>
        <Text style={styles.label}>Select Currency:</Text>
        <SelectList
            defaultOption={selectedCurrency}
            setSelected={(val:SelectOption) => setSelectedCurrency(val)}
            data={currencies}
            boxStyles={styles.selectBox}
            inputStyles={styles.input}
            dropdownStyles={styles.dropdown}
            dropdownTextStyles={styles.dropdownText}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  selectBox: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  input: {
    fontSize: 16,
  },
  dropdown: {
    borderRadius: 4,
  },
  dropdownText: {
    fontSize: 16,
  },
});

export default CurrencySelector;
