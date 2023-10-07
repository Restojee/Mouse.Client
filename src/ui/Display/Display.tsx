import { ReactElement } from 'react';

export function Display<ConditionType>(props: { condition: ConditionType, children: ReactElement }) {
    if (props.condition) {
        return props.children;
    }
    return null;
}