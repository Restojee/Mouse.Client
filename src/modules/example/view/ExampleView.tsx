import * as React from "react";
import { withView } from "@common/hocs/withView";
import { WithViewProps } from "@common/hocs/withView/types";
import { ExampleViewModel } from "../model/ExampleViewModel";
import { Button } from "@common/components/Button";
import { Typography } from "@common/components/Typography";
import { Input } from "@common/components/Input";
import { Paper, Row, Column, Stack, Flex, Grid } from "@common/components/Layout";
import { TextTags } from "@common/constants/textTags";

import "./ExampleView.scss";

interface ExampleViewProps {
  initialTitle?: string;
  maxCount?: number;
}

const ExampleViewComponent: React.FC<WithViewProps<ExampleViewModel, ExampleViewProps>> = ({ 
  viewModel 
}) => {
  return (
    <Column 
      align="center" 
      pa="lg"
      gap="lg"
      maxWidth="800px"
      width="100%"
    >
      {/* 🎯 Заголовок и информация */}
      <Paper 
        bgColor="paletteBackgroundColorsPurpleDark" 
        radius="md"
      >
        <Column 
          gap="md" 
          pa="lg"
          width="100%"
        >
          <Typography 
            tag={TextTags.H1} 
            fontSize="typographyH1FontSize" 
            color="paletteTextOnColor"
          >
            {viewModel.title}
          </Typography>
          <Typography 
            fontSize="typographyTextNormalFontSize" 
            color="paletteTextOnColor"
          >
            Эталонный компонент, демонстрирующий архитектуру MVVM с withView
          </Typography>
        </Column>
      </Paper>

      {/* 📊 Статус и прогресс */}
      <Row gap="lg" width="100%">
        <Paper 
          bgColor="paletteBackgroundStatusInfoDark" 
          radius="md"
        >
          <Column gap="sm" pa="md" width="100%">
            <Typography 
              tag={TextTags.H3} 
              color="paletteTextOnColor"
            >
              📈 Статус
            </Typography>
            <Typography 
              fontSize="typographyH2FontSize" 
              color="paletteTextOnColor"
            >
              {viewModel.statusText}
            </Typography>
            <Typography 
              fontSize="typographyTextNormalFontSize" 
              color="paletteTextOnColor"
            >
              Значение: {viewModel.count} / {viewModel.maxCount}
            </Typography>
          </Column>
        </Paper>

        <Paper 
          bgColor="paletteBackgroundStatusSuccessDark" 
          radius="md"
        >
          <Column gap="sm" pa="md" width="100%">
            <Typography 
              tag={TextTags.H3} 
              color="paletteTextOnColor"
            >
              🧮 Вычисления
            </Typography>
            <Typography 
              fontSize="typographyH2FontSize" 
              color="paletteTextOnColor"
            >
              Удвоенное: {viewModel.doubleCount}
            </Typography>
            <Typography 
              fontSize="typographyTextNormalFontSize" 
              color="paletteTextOnColor"
            >
              Прогресс: {viewModel.progressPercent.toFixed(1)}%
            </Typography>
          </Column>
        </Paper>
      </Row>

      {/* 📊 Прогресс бар */}
      <Paper 
        bgColor="paletteBackgroundColorsPinkDark" 
        radius="md"
      >
        <Column gap="sm" pa="md" width="100%">
          <Typography 
            tag={TextTags.H3} 
            color="paletteTextOnColor"
          >
            📊 Прогресс-бар
          </Typography>
          <Paper 
            bgColor="paletteColorsSecondary" 
            radius="md"
          >
            <Flex 
              width="100%" 
              height="20px" 
              justify="start" 
              align="center"
            >
              <div 
                className={`ProgressBar ${viewModel.isMaxReached ? 'danger' : 'success'}`}
                style={{ 
                  width: `${viewModel.progressPercent}%`
                }} 
              />
            </Flex>
          </Paper>
        </Column>
      </Paper>

      {/* ⚡ Управление */}
      <Paper 
        bgColor="paletteBackgroundStatusDangerDark" 
        radius="md"
      >
        <Column gap="md" pa="lg" width="100%">
          <Typography 
            tag={TextTags.H3} 
            color="paletteTextOnColor"
          >
            ⚡ Управление
          </Typography>
          
          <Row gap="sm">
            <Button 
              label="➕ Увеличить"
              disabled={viewModel.isMaxReached || viewModel.isLoading}
              color="paletteTextOnColor"
              bgColor="paletteBackgroundStatusSuccessDark"
              onClick={() => viewModel.increment()}
            />
            
            <Button 
              label="➖ Уменьшить"
              disabled={viewModel.count === 0 || viewModel.isLoading}
              color="paletteTextOnColor"
              bgColor="paletteBackgroundStatusDangerDark"
              onClick={() => viewModel.decrement()}
            />
            
            <Button 
              label="🔄 Сброс"
              disabled={viewModel.isLoading}
              color="paletteTextOnColor"
              bgColor="paletteBackgroundColorsIndigoDark"
              onClick={() => viewModel.reset()}
            />
          </Row>

                     <Row gap="sm" align="center">
            <Input 
              placeholder="Новый заголовок"
              value={viewModel.title}
              onChange={(e) => viewModel.setTitle(e.target.value)}
              readOnly={viewModel.isLoading}
              bgColor="paletteBackgroundSecondary"
              color="paletteTextLink"
            />
            
            <Button 
              label={viewModel.isLoading ? "🔄 Загрузка..." : "📥 Загрузить данные"}
              disabled={viewModel.isLoading}
              color="paletteTextOnColor"
              bgColor="paletteBackgroundStatusInfoDark"
              onClick={() => viewModel.loadData()}
            />
          </Row>
        </Column>
      </Paper>

      {/* 📝 Сообщения */}
      {viewModel.message && (
        <Paper 
          bgColor="paletteBackgroundColorsIndigoDark" 
          radius="md"
        >
          <Column gap="sm" pa="md" width="100%">
            <Typography 
              tag={TextTags.H3} 
              color="paletteTextOnColor"
            >
              📢 Сообщение
            </Typography>
            <Typography color="paletteTextOnColor">
              {viewModel.message}
            </Typography>
          </Column>
        </Paper>
      )}

      {/* 📋 Список элементов */}
      {viewModel.items.length > 0 && (
        <Paper 
          bgColor="paletteBackgroundStatusErrorDark" 
          radius="md"
        >
          <Column gap="md" pa="lg" width="100%">
            <Typography 
              tag={TextTags.H3} 
              color="paletteTextOnColor"
            >
              📋 Список элементов ({viewModel.items.length})
            </Typography>
            
            <Grid 
              autoFit
              minColumnWidth="120"
              gap="sm"
              width="100"
            >
              {viewModel.items.map((item, index) => (
                <Paper 
                  key={index}
                  bgColor="paletteBackgroundColorsTealDark"
                  radius="sm"
                >
                  <Flex pa="sm" justify="center">
                    <Typography color="paletteTextOnColor">
                      {item}
                    </Typography>
                  </Flex>
                </Paper>
              ))}
            </Grid>
            
            <Typography 
              fontSize="typographyTextNormalFontSize" 
              color="paletteTextOnColor"
            >
              Текстовое представление: {viewModel.itemsText}
            </Typography>
          </Column>
        </Paper>
      )}

      {/* 🔧 Техническая информация */}
      <Paper 
        bgColor="paletteBackgroundStatusErrorDark" 
        radius="md"
      >
        <Column gap="sm" pa="md" width="100%">
          <Typography 
            tag={TextTags.H4} 
            color="paletteTextOnColor"
          >
            🔧 Техническая информация:
          </Typography>
          <Column gap="xs">
            <Typography fontSize="typographyFontSizeXs" color="paletteTextOnColor">
              🎯 <Typography fontSize="typographyFontSizeXs" fontWeight="bold" color="paletteTextOnColor">@State</Typography>: count, title, items, isLoading, message
            </Typography>
            <Typography fontSize="typographyFontSizeXs" color="paletteTextOnColor">
              🧮 <Typography fontSize="typographyFontSizeXs" fontWeight="bold" color="paletteTextOnColor">@Computed</Typography>: doubleCount, isMaxReached, progressPercent, statusText
            </Typography>
            <Typography fontSize="typographyFontSizeXs" color="paletteTextOnColor">
              ⚡ <Typography fontSize="typographyFontSizeXs" fontWeight="bold" color="paletteTextOnColor">@Action</Typography>: increment, decrement, reset, setTitle, loadData
            </Typography>
            <Typography fontSize="typographyFontSizeXs" color="paletteTextOnColor">
              📦 <Typography fontSize="typographyFontSizeXs" fontWeight="bold" color="paletteTextOnColor">@Prop</Typography>: initialTitle, maxCount
            </Typography>
            <Typography fontSize="typographyFontSizeXs" color="paletteTextOnColor">
              👀 <Typography fontSize="typographyFontSizeXs" fontWeight="bold" color="paletteTextOnColor">@OnWatch</Typography>: наблюдение за count, items.length, title
            </Typography>
            <Typography fontSize="typographyFontSizeXs" color="paletteTextOnColor">
              🚀 <Typography fontSize="typographyFontSizeXs" fontWeight="bold" color="paletteTextOnColor">@OnMounted</Typography>: автоматическая инициализация
            </Typography>
          </Column>
          <Typography 
            fontSize="typographyFontSizeXs" 
            color="paletteTextOnColor"
          >
            Откройте консоль браузера, чтобы увидеть логи от наблюдателей!
          </Typography>
        </Column>
      </Paper>
    </Column>
  );
};

// Экспортируем компонент, обернутый в withView
export const ExampleView = withView(ExampleViewComponent, ExampleViewModel); 