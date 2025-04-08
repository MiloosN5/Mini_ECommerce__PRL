import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../store/store";

interface ListProps {
    parent?: string;
    modifier?: string;
    data: any[];
    schema: any;
}

const List = ({ parent, modifier, data, schema }: ListProps) => {
    const token = localStorage.getItem("token");
    const { user } = useAppSelector((state: RootState) => state.auth);

    return (
        <ul
            className={`list ${modifier ? `list--${modifier}` : ``} ${parent ? `${parent}__list` : ``}`}
        >
            {data.map(
                (item, index) =>
                    (!item.guard || (token && user)) && (
                        <li
                            key={index}
                            aria-label={
                                item.name.charAt(0).toUpperCase() +
                                item.name.toLowerCase().slice(1)
                            }
                        >
                            {schema(item)}
                        </li>
                    ),
            )}
        </ul>
    );
};

export default List;
