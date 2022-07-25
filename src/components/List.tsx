import React from 'react';

interface ListProps<T> {
    items: T[],
    renderItem: (item:T) => React.ReactNode
}

function List<T>(props: ListProps<T>) {
    return (
        <div>
            {props.items.map(props.renderItem)}
        </div>
    );
}

export default List;