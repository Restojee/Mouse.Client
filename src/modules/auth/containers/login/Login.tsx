import { LoginRequest } from '@/api/codegen/genMouseMapsApi';
import { useLogin } from '@/modules/auth/hooks/useLogin';
import { StyledBox } from '@/ui/Box';
import { Button } from '@/ui/Button';
import { Form } from '@/ui/Form/Form';
import { Input } from '@/ui/Input';
import { Controller, useForm } from 'react-hook-form';

export const Login = () => {
    const {
        handleSubmit,
        control,
    } = useForm<LoginRequest>();
    const {
        login,
    } = useLogin();

    const onSubmit = async (data: LoginRequest) => {
        await login(data);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <StyledBox
                direction={'column'}
                width={'100%'}
                gap={20}
            >
                <Controller
                    control={control}
                    name={'userName'}
                    render={({ field }) => (
                        <Input
                            name={field.name}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            disabled={field.disabled}
                            value={field.value}
                            type={'name'}
                            placeholder={'Логин'}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name={'password'}
                    render={({ field }) => (
                        <Input
                            name={field.name}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            disabled={field.disabled}
                            value={field.value}
                            type={'password'}
                            placeholder={'Пароль'}
                        />
                    )}
                />
                <Button
                    margin={'auto'}
                    size={'lg'}
                    label={'Войти'}
                    type={'submit'}
                />
            </StyledBox>
        </Form>
    );
};

