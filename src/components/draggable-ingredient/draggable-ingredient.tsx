import styles from "./draggable-ingredient.module.css";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { reorderIngredient, removeIngredient } from '../../services/burgerConstuctorSlice';
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { IngredientType } from '../../utils/types';

interface IDraggableIngredientProps {
    ingredient: IngredientType;
    index: number;
}

const DraggableIngredient: React.FC<IDraggableIngredientProps> = ({ ingredient, index }) => {

    const id = ingredient.id;
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const [{ isDragging }, drag] = useDrag({
        type: "CONSTRUCTOR_ELEMENT",
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "CONSTRUCTOR_ELEMENT",
        hover(item: any, monitor) {
            const dragIndex = item.index;
            const hoverIndex = index;
            // проверка, что перемещаемый элемент не находится на той же позиции, что и элемент, на который он наведен
            if (dragIndex === hoverIndex) {
                return;
            }
            //координаты области drop и координаты указателя мыши, чтобы определить, находится ли перемещаемый элемент выше или ниже центра области drop
            const hoverBoundingRect = ref.current!.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            // если перемещаемый элемент перемещается вверх и находится выше центра области drop, 
            //или если он перемещается вниз и находится ниже центра области drop, ничего не происходит, и функция завершается.
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Если перемещаемый элемент перемещается вверх и находится ниже центра области drop, 
            //или если он перемещается вниз и находится выше центра области drop, вызывается экшен reorderIngredient, 
            dispatch(reorderIngredient({ from: dragIndex, to: hoverIndex }));
            // обновляем index объекта item, чтобы отражать его новую позицию.
            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

    //удаление ингредиента из массива otherIngredients
    const handleClose = () => {
        dispatch(removeIngredient(ingredient));
    };

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0 : 1, cursor: 'move' }}>
            <div className={styles.element_main}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={handleClose}
                />
            </div>
        </div>
    );
}

export default DraggableIngredient;
