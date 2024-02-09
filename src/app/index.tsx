import { CategoryButton } from '@/components/categoryButton';
import { Header } from '@/components/header';
import { View, FlatList } from 'react-native';
import { CATEGORIES } from '@/utils/data/products'
import { useState } from 'react';

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0])

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)
  }

  return (
    <View className="flex-1">
      <Header title="Faça seu Pedido" cartQuantityItems={5} />

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

    </View>
  )
}
