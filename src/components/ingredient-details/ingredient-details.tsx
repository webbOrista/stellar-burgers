import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { IngredientsSelector } from '../../services/slices/ingredientsSlice';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  /** DONE: взять переменную из стора */

  const { id } = useParams<{ id: string }>();
  const ingredient = useSelector(IngredientsSelector.IngredientsDataSelector);

  const ingredientData = ingredient.find((item) => item._id === id)

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
