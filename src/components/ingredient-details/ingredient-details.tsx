import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { IngredientsSelector } from '../../services/slices/ingredientsSlice/ingredientsSlice';
import { useSelector } from '../../services/store/store';

export const IngredientDetails: FC = () => {
  /** DONE: взять переменную из стора */

  const { id } = useParams<{ id: string }>();
  console.log('ID from useParams:', id);

  const ingredients = useSelector(IngredientsSelector.IngredientsDataSelector);
  console.log('Ingredients from store:', ingredients);

  const ingredientData = ingredients.find((item) => item._id === id);
  console.log('Found ingredientData:', ingredientData);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
