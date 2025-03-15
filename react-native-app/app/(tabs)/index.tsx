import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useState } from "react";
import { useRouter } from 'expo-router';
import { fetchProducts } from "@/data/data";
import { ProductDto } from "@/data/data.type";
import CurrencySelector from '@/components/CurrencySelector';

export default function HomeScreen() {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // TODO: change product price based on the selected currency (BE + FE)
        fetchProducts()
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const renderItem = ({ item }: { item: ProductDto }) => (
        <Pressable
            onPress={() => router.push(`/orders?productId=${item.id}`)}
            style={styles.itemContainer}
        >
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </Pressable>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
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
            <View>
                <CurrencySelector />
            </View>
            <FlatList
                data={products}
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
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
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
