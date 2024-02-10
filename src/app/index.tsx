import { CategoryButton } from '@/components/categoryButton';
import { Header } from '@/components/header';
import { View, FlatList, SectionList, Text } from 'react-native';
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'
import { useRef, useState } from 'react';
import { Product } from '@/components/product';
import { Link } from 'expo-router';
import { useCartStore } from '@/stores/cartStores';

export default function Home() {
  const cartStores = useCartStore()
  const sectionListRef = useRef<SectionList<ProductProps>>(null);
  const [category, setCategory] = useState(CATEGORIES[0])

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory)

    if (sectionListRef.current)  {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true
      })
    }
  }

  const cartQuantityItems = cartStores.products.reduce((total, product) => total + product.quantity, 0)

  return (
    <View className="flex-1">
      <Header title="Faça seu Pedido" cartQuantityItems={cartQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <CategoryButton
          title={item}
          isSelected={item === category}
          onPress={() => handleCategorySelect(item)}
        />}
        horizontal
        className='max-h-10 mt-5'
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className='text-white text-xl font-heading mt-8 mb-3'>
            {title}
          </Text>
        )}
        className='flex-1
         p-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4, paddingBottom: 100 }}
      />

    </View>
  )
}
