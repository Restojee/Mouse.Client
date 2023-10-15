import { Tag } from '@/api/codegen/genMouseMapsApi';
import { StyledBox } from '@/ui/Box';
import { SearchForm } from '@/ui/SearchForm/SearchForm';
import { StyledTag } from '@/ui/Tag/styled';
import { Typography } from '@/ui/Typography';

type CreateTagsPropsType = {
    tags: Tag[]
}
export const CreateTags = (props: CreateTagsPropsType) => (
    <StyledBox gap="20px" direction="column" width="100%">
        <SearchForm width="100%" placeholder="Поиск..."/>
        <StyledBox maxHeight="400px">
            {props.tags.map(({ name }) => (
                <StyledTag key={name} chips>
                    <Typography isEllipsis>{name}</Typography>
                </StyledTag>
            ))}
        </StyledBox>
    </StyledBox>
);