import { ChangeEventHandler } from 'react';
import InputMask from 'react-input-mask';

interface IDocumentInput {
    value: string | number | readonly string[] | undefined;
    onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}

export default function DocumentInput(props: IDocumentInput) {
    return (
        <InputMask
            mask="(99) 99999-9999"
            value={props.value}
            onChange={props.onChange}
            required>
        </InputMask>
    );
}