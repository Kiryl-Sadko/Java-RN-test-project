import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {fetchLatestExchangeRate, fetchProductOrders} from '@/data/data';
import {EnrichedOrder} from '@/data/data.type';
import CurrencySelector from '@/components/CurrencySelector';
import {useSearchParams} from "expo-router/build/hooks";

export default function OrdersScreen() {
    const searchParams = useSearchParams();
    const [orders, setOrders] = useState<EnrichedOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const productId = searchParams.get("productId");
        if (productId) {
            fetchProductOrders(Number(productId))
                .then((data) => {
                    Promise.all(
                        data.map(async (o) => {
                            try {
                                const exchangeRate = await fetchLatestExchangeRate(o.currency, new Date(o.timestamp).getTime());
                                return {
                                    ...o,
                                    localPrice: o.product.price * exchangeRate.rate
                                } as EnrichedOrder;
                            } catch (error) {
                                // Handle error per order if needed
                                return {
                                    ...o,
                                    localPrice: o.product.price
                                } as EnrichedOrder;
                            }
                        })
                    ).then((enrichedOrders) => {
                        setOrders(enrichedOrders);
                        setLoading(false);
                    });
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, []);

    const renderItem = ({item}: { item: EnrichedOrder }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Order ID: {item.id}</Text>
            {/* TODO: use currency from selector */}
            <Text style={styles.itemText}>Price: {item.localPrice} {item.currency}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <CurrencySelector/>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
    listContent: {
        padding: 16,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
